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
		var stmt = db.prepare(`insert into census
		('DIVISION_ID', 'DISTRICT_ID', 'THANA_UPZ_ID', 'WARD_UNION_ID', 'MAHALLAH_ID', 'RMO_CODE', 'SERIAL_NO_UNIT', 'NAME_OF_UNIT', 'NAME_OF_MAHALLAH','NAME_OF_HOUSE', 'NO_NAME_OF_ROAD', 'FLOOR_LEVEL',
	    'HOLIDING_NO', 'PHONE', 'FAX', 'EMAIL', 'WEBSITE', LEGAL_OWNERSHIP_CODE, TYPE_OF_OWNERSHIP, HEAD_GENDER_CODE, HEAD_OF_UNIT_AGE, HEAD_EDUCATION_CODE
	    , HEAD_OFFICE_NAME, HEAD_OFFICE_MAHALLAH, HEAD_OFFICE_HOUSE, HEAD_OFFICE_ROAD, HEAD_OFFICE_FLOOR_LEVEL, HEAD_OFFICE_HOLIDING_NO, HEAD_OFFICE_PHONE,
	    HEAD_OFFICE_FAX, HEAD_OFFICE_EMAIL, HEAD_OFFICE_WEBSITE) 
		values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`);

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
			Census.HEAD_OFFICE_WEBSITE
		);

		store.emit('data-updated');
	});
}

store.editCensus = (catId, Census) => {
	db.serialize(function () {
		var sql = `update census set 
		DIVISION_ID=${Census.DIVISION_ID}, 
		DISTRICT_ID=${Census.DISTRICT_ID}, 
		THANA_UPZ_ID=${Census.THANA_UPZ_ID}, 
		WARD_UNION_ID=${Census.WARD_UNION_ID}, 
		MAHALLAH_ID=${Census.MAHALLAH_ID}, 
		RMO_CODE=${Census.RMO_CODE}, 
		SERIAL_NO_UNIT="${Census.SERIAL_NO_UNIT}", 
		NAME_OF_UNIT="${Census.NAME_OF_UNIT}", 
		NAME_OF_MAHALLAH="${Census.NAME_OF_MAHALLAH}",
		NAME_OF_HOUSE="${Census.NAME_OF_HOUSE}",
		NO_NAME_OF_ROAD="${Census.NO_NAME_OF_ROAD}",
		FLOOR_LEVEL="${Census.FLOOR_LEVEL}",
		HOLIDING_NO="${Census.HOLIDING_NO}",
		PHONE="${Census.PHONE}",
		FAX="${Census.FAX}",
		EMAIL="${Census.EMAIL}",
		WEBSITE="${Census.WEBSITE}",
		LEGAL_OWNERSHIP_CODE=${Census.LEGAL_OWNERSHIP_CODE},
		TYPE_OF_OWNERSHIP=${Census.TYPE_OF_OWNERSHIP},
		HEAD_GENDER_CODE=${Census.HEAD_GENDER_CODE},
		HEAD_OF_UNIT_AGE=${Census.HEAD_OF_UNIT_AGE},
		HEAD_EDUCATION_CODE=${Census.HEAD_EDUCATION_CODE},
		HEAD_OFFICE_NAME="${Census.HEAD_OFFICE_NAME}",
		HEAD_OFFICE_MAHALLAH="${Census.HEAD_OFFICE_MAHALLAH}",
		HEAD_OFFICE_HOUSE="${Census.HEAD_OFFICE_HOUSE}",
		HEAD_OFFICE_ROAD="${Census.HEAD_OFFICE_ROAD}",
		HEAD_OFFICE_FLOOR_LEVEL="${Census.HEAD_OFFICE_FLOOR_LEVEL}",
		HEAD_OFFICE_HOLIDING_NO="${Census.HEAD_OFFICE_HOLIDING_NO}",
		HEAD_OFFICE_PHONE="${Census.HEAD_OFFICE_PHONE}",
		HEAD_OFFICE_FAX="${Census.HEAD_OFFICE_FAX}",
		HEAD_OFFICE_EMAIL="${Census.HEAD_OFFICE_EMAIL}",
		HEAD_OFFICE_WEBSITE="${Census.HEAD_OFFICE_WEBSITE}"
		where ID=${Census.ID}`;
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
