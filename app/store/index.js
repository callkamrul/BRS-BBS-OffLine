import { EventEmitter } from 'events';

const store = new EventEmitter();

store.getDivisionList = function(cb)
{
	var list =[];
	db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME
	From DIVISIONS`, function (err, row) {
				list.push(row);
			}, function (err, rowCount) {
				cb(null, list);
			});
}

store.getDistrictList = function(cb, $division_id = null)
{
    var list =[];
    if($division_id){
        db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME
	From DISTRICTS where DIVISION_ID=${$division_id}`, function (err, row) {
            list.push(row);
        }, function (err, rowCount) {
            cb(null, list);
        });
    }else {
        db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME
				 From DISTRICTS`, function (err, row) {
            list.push(row);
        }, function (err, rowCount) {
            cb(null, list);
        });
	}
}

store.getThanaUpazillaByDistrict = function(cb, $districtId = null)
{
	var $condition = '';
	if($districtId){
        $condition = `where DISTRICT_ID=${$districtId}`;
	}

    var thanaList =[];
    db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME
	From THANA_UPAZILAS ${$condition}`, function (err, row) {
        thanaList.push(row);
    }, function (err, rowCount) {
        cb(null, thanaList);
    });
}
store.getUnionWardByThanaUpazilla = function(cb, $thanaId)
{
    var $condition = '';
    if($thanaId){
        $condition = `where thana_upazila_id=${$thanaId}`;
    }
    var unionList =[];
    db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME
	From UNION_WARDS ${$condition}`, function (err, row) {
        unionList.push(row);
    }, function (err, rowCount) {
        cb(null, unionList);
    });
}

store.getMauzaMahallahByUnionWard = function(cb, $unioWardId)
{
    var list =[];
    db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME
	From mauza_mahallahs where union_ward_id=${$unioWardId}`, function (err, row) {
        list.push(row);
    }, function (err, rowCount) {
        cb(null, list);
    });
}

store.getAllCommonConfigList = function (cb, $table_name, $lang = 'en') {
	var list = [];

	db.each(`SELECT ID, (CODE ||' - '|| NAME_BN) AS NAME
From ${$table_name}`, function (err, row) {
			list.push(row);
		}, function (err, rowCount) {
			cb(null, list);
		});
}

store.getCensuses = function (cb) {
	var censuses = {};

	db.each(`SELECT census.id AS id,
	census.census_year AS census_year,
	census.SERIAL_NO_UNIT AS serial_no,
	census.NAME_OF_UNIT AS NAME_OF_UNIT,
	census.unit_type_code,
	census.unit_identification_code AS unit_identification_code,
	census.is_registered AS is_registred,
   
	cc_unit_type.name AS unit_type_name,
	cc_unit_type.name_bn AS unit_type_name_bn,
	census.operator_user_id AS operator_user_id,
	census.present_status_id AS present_status_id,
	census.thana_upz_id AS thana_upz_id,
	census.district_id AS district_id,
	census.division_id AS division_id
From census LEFT JOIN cc_unit_type ON cc_unit_type.id = census.unit_type_code`, function (err, row) {
			censuses[row.id] = row;
		}, function (err, rowCount) {
			cb(null, censuses);
		});
}

store.getCensus = function (catId, cb) {
	db.get("select * from census where id=?", { 1: catId },
		function (err, row) {
			cb(null, row);
		});
}

store.addCensus = (Census) => {
	db.serialize(function () {

        if(Census.UNIT_TYPE_CODE == 2){
            Census.IS_UNDER_ENT_GROUP = Census.IS_UNDER_ENT_GROUP2
        }
        delete Census.IS_UNDER_ENT_GROUP2;

		var stmt = db.prepare(`insert into census
		('DIVISION_ID', 'DISTRICT_ID', 'THANA_UPZ_ID', 'WARD_UNION_ID', 'MAHALLAH_ID', 'RMO_CODE', 'SERIAL_NO_UNIT', 'NAME_OF_UNIT', 'NAME_OF_MAHALLAH','NAME_OF_HOUSE', 'NO_NAME_OF_ROAD', 'FLOOR_LEVEL',
	    'HOLIDING_NO', 'PHONE', 'FAX', 'EMAIL', 'WEBSITE', LEGAL_OWNERSHIP_CODE, TYPE_OF_OWNERSHIP, HEAD_GENDER_CODE, HEAD_OF_UNIT_AGE, HEAD_EDUCATION_CODE
	    , HEAD_OFFICE_NAME, HEAD_OFFICE_MAHALLAH, HEAD_OFFICE_HOUSE, HEAD_OFFICE_ROAD, HEAD_OFFICE_FLOOR_LEVEL, HEAD_OFFICE_HOLIDING_NO, HEAD_OFFICE_PHONE,
	    HEAD_OFFICE_FAX, HEAD_OFFICE_EMAIL, HEAD_OFFICE_WEBSITE, HEAD_OFFICE_DIVISION, HEAD_OFFICE_DISTRICT, HEAD_OFFICE_THANA_UPZ, HEAD_OFFICE_WARD_UNION,
	    HEAD_OFFICE_MAUZA, HEAD_OFFICE_RMO_CODE, IS_UNDER_ENT_GROUP, ENTERPRISE_GROUP_ID, IS_UNDER_ENTERPRISE, ENTERPRISE_ID, IS_UNDER_ENT_GROUP, ENTERPRISE_GROUP_ID_2,
	    UNIT_TYPE_CODE, IS_REPORTING_UNIT, UNIT_MODE_CODE, HAS_TRADE_LICENSE, TRADE_LICENSE_AUTHORITY, TRADE_LICENSE_NUMBER,
	    IS_REGISTERED, REG_ORG_CODE1, REG_ORG_CODE2, REG_ORG_CODE3, REGISTRATION_NO1, REGISTRATION_NO2, REGISTRATION_NO3) 
		values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
		 ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

		stmt.run(Census.DIVISION_ID,
			Census.DISTRICT_ID,
			Census.THANA_UPZ_ID,
			Census.WARD_UNION_ID,
			Census.MAHALLAH_ID,
			Census.RMO_CODE,
			Census.SERIAL_NO_UNIT,
			Census.NAME_OF_UNIT,
			Census.NAME_OF_MAHALLAH,
			Census.NAME_OF_HOUSE,
			Census.NO_NAME_OF_ROAD,
			Census.FLOOR_LEVEL,
			Census.HOLIDING_NO,
			Census.PHONE,
			Census.FAX,
			Census.EMAIL,
			Census.WEBSITE,
			Census.LEGAL_OWNERSHIP_CODE,
			Census.TYPE_OF_OWNERSHIP,
			Census.HEAD_GENDER_CODE,
			Census.HEAD_OF_UNIT_AGE,
			Census.HEAD_EDUCATION_CODE,
			Census.HEAD_OFFICE_NAME,
			Census.HEAD_OFFICE_MAHALLAH,
			Census.HEAD_OFFICE_HOUSE,
			Census.HEAD_OFFICE_ROAD,
			Census.HEAD_OFFICE_FLOOR_LEVEL,
			Census.HEAD_OFFICE_HOLIDING_NO,
			Census.HEAD_OFFICE_PHONE,
			Census.HEAD_OFFICE_FAX,
			Census.HEAD_OFFICE_EMAIL,
			Census.HEAD_OFFICE_WEBSITE,
			Census.HEAD_OFFICE_DIVISION,
            Census.HEAD_OFFICE_DISTRICT,
            Census.HEAD_OFFICE_THANA_UPZ,
            Census.HEAD_OFFICE_WARD_UNION,
            Census.HEAD_OFFICE_MAUZA,
            Census.HEAD_OFFICE_RMO_CODE,
            Census.IS_UNDER_ENT_GROUP,
            Census.ENTERPRISE_GROUP_ID,
            Census.IS_UNDER_ENTERPRISE,
            Census.ENTERPRISE_ID,
            Census.IS_UNDER_ENT_GROUP2,
            Census.ENTERPRISE_GROUP_ID_2,
            Census.UNIT_TYPE_CODE,
            Census.IS_REPORTING_UNIT,
            Census.UNIT_MODE_CODE,
            Census.HAS_TRADE_LICENSE,
            Census.TRADE_LICENSE_AUTHORITY,
            Census.TRADE_LICENSE_NUMBER,
            Census.IS_REGISTERED,
            Census.REG_ORG_CODE1,
            Census.REG_ORG_CODE2,
            Census.REG_ORG_CODE3,
            Census.REGISTRATION_NO1,
            Census.REGISTRATION_NO2,
            Census.REGISTRATION_NO3,
		);

		store.emit('data-updated');
	});
}

/**
 * Update census form data
 * @param catId
 * @param Census	Census data object
 */
store.editCensus = (catId, Census) => {
	db.serialize(function () {
		if(Census.UNIT_TYPE_CODE == 2){
            Census.IS_UNDER_ENT_GROUP = Census.IS_UNDER_ENT_GROUP2
		}
        delete Census.IS_UNDER_ENT_GROUP2;
		// Generate automatically update query with all database field and value taken from census form
		// by looping through the Census object
        var rawSql = '';
		var c = 0;
        for (var key in Census) {
            if (Census.hasOwnProperty(key) && key != 'ID') {
                c++;
				if(c > 1){
                    rawSql += `,`;
				}
                rawSql+= key +`= "`+ Census[key] + `"`;
            }
        }

		var sql = `update census set `;
        sql += rawSql
        sql+=` where ID=${Census.ID}`;
		db.run(sql);
		store.emit('data-updated');
	});
}

store.deleteCensus = (catId) => {
	db.serialize(function () {
		var stmt = db.prepare("delete from census where ID=?");
		stmt.run(catId);
		store.emit('data-updated');
	});
}



export default store
