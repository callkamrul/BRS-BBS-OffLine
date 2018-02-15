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

        // Generate automatically insert query with all database field and value taken from census form
        // by looping through the Census object
        var sqlParam = `insert into census (`;
        var values = ` values(`;
        var bindValues = '';
        var c = 0;
        console.log(Census)
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
                    values+= `'` + Census[key] + `'`;
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
