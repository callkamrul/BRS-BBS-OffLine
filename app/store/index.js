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
        db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME, DIVISION_ID
	From DISTRICTS where DIVISION_ID=${$division_id}`, function (err, row) {
            list.push(row);
        }, function (err, rowCount) {
            cb(null, list);
        });
    }else {
        db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME, DIVISION_ID
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
    db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME, DISTRICT_ID
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
        $condition = `where THANA_UPAZILA_ID=${$thanaId}`;
    }
    var unionList =[];
    db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME, THANA_UPAZILA_ID
	From UNION_WARDS ${$condition}`, function (err, row) {
        unionList.push(row);
    }, function (err, rowCount) {
        cb(null, unionList);
    });
}

store.getMauzaMahallahByUnionWard = function(cb, $unioWardId)
{
    var $condition = '';
    if($unioWardId){
        $condition = `where union_ward_id=${$unioWardId}`;
    }

    var list =[];
    db.each(`SELECT ID, (GEO_CODE ||' - '|| NAME) AS NAME, UNION_WARD_ID
	From mauza_mahallahs ${$condition}`, function (err, row) {
        list.push(row);
    }, function (err, rowCount) {
        cb(null, list);
    });
}

store.getAllCommonConfigList = function (cb, $table_name, $lang = 'bn') {
    var $condition = 'NAME_BN';
    if($lang == 'en'){
        $condition = `NAME`;
    }
	var list = [];

	db.each(`SELECT ID, (CODE ||' - '|| ${$condition}) AS NAME
From ${$table_name}`, function (err, row) {
			list.push(row);
		}, function (err, rowCount) {
			cb(null, list);
		});
}
store.getIndustrialCode = function (cb, $table_name = 'bsic_product_classes', $lang = 'en') {
    var list = [];

    db.each(`SELECT ID, CODE AS NAME
From ${$table_name} ORDER BY CODE ASC`, function (err, row) {
        list.push(row);
    }, function (err, rowCount) {
        cb(null, list);
    });
}

store.getAnswerOption = function (cb, $table_name = 'cc_answer_options', $def= 0, $lang = 'en') {
    var $condition = '';
    if($def == 0){
        $condition = `where ID != 3`;
    }
    var list = [];
    db.each(`SELECT ID, (CODE ||' - '|| NAME_BN) AS NAME
From ${$table_name} ${$condition}`, function (err, row) {
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
	census.division_id AS division_id,
	(mauza_mahallahs.NAME ||', '|| union_wards.NAME
	||', '|| thana_upazilas.NAME ||', '|| districts.NAME
	||', '|| divisions.NAME) AS location
    From census 
    LEFT JOIN cc_unit_type ON cc_unit_type.id = census.unit_type_code
    LEFT JOIN mauza_mahallahs ON mauza_mahallahs.id = census.mahallah_id
    LEFT JOIN union_wards ON union_wards.id = census.ward_union_id
    LEFT JOIN thana_upazilas ON thana_upazilas.id = census.thana_upz_id
    LEFT JOIN districts ON districts.id = census.district_id
    LEFT JOIN divisions ON divisions.id = census.division_id
    `, function (err, row) {
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

var uppercaseField = [
    "NAME_OF_UNIT",
    "NAME_OF_MAHALLAH",
    "NAME_OF_HOUSE",
    "NO_NAME_OF_ROAD",
    "FLOOR_LEVEL",
    "HOLIDING_NO",
    "ENTERPRISE_GROUP_ID",
    "ENTERPRISE_ID",
    "ENTERPRISE_GROUP_ID_2",
    "HEAD_OFFICE_NAME",
    "HEAD_OFFICE_MAHALLAH",
    "HEAD_OFFICE_HOUSE",
    "HEAD_OFFICE_ROAD",
];

store.addCensus = (Census) => {
	db.serialize(function () {

        if(Census.UNIT_TYPE_CODE == 2){
            Census.IS_UNDER_ENT_GROUP = Census.IS_UNDER_ENT_GROUP2
        }
        delete Census.IS_UNDER_ENT_GROUP2;
        // Generate automatically insert query with all database field and value taken from census form
        // by looping through the Census object
        var sqlParam = `insert into census (`;
        var values = ` values(`;
        var bindValues = '';
        var c = 0;
        for (var key in Census) {
            if (Census.hasOwnProperty(key) && key != 'ID') {
                /**
                 * Check if condition because every field comming from form with double
                 * one for for v-model and other for input control name
                 * but we need only v-model name value and v-model name value must be capital
                 */
                if(key.toUpperCase() == key){
                    c++;
                    if(c > 1){	// So that a comma(,) is placed after every key value but not before first key value
                        sqlParam += `,`;
                        values += `,`;
                        bindValues += `,`;
                    }

                    sqlParam+= `'` + key.toUpperCase() + `'`;
                    if(Census[key] && uppercaseField.indexOf(key) >= 0){   // Make some specific field value to upper case letter.
                        values+= `'` + Census[key].toUpperCase() + `'`;
                    }else {

                        values+= `'` + Census[key] + `'`;
                    }
                }
                //bindValues+= `'` + Census[key] + `'`;
                /*if(!Census[key]){
                    bindValues+= null;
				}else {
                    bindValues+= `'` + Census[key] + `'`;
				}*/
            }
        }
        sqlParam += `)`
        values += `)`
		var sql = sqlParam + values ;

		var stmt = db.prepare(sql);
		stmt.run();

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
				if(c > 1){	// So that a comma(,) is placed after every key value but not before first key value
                    rawSql += `,`;
				}
                if(Census[key] && uppercaseField.indexOf(key) >= 0){   // Make some specific field value to upper case letter.
                    rawSql+= key +`= "`+ Census[key].toUpperCase() + `"`;
                }else {
                    rawSql+= key +`= "`+ Census[key] + `"`;
                }
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
