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
		('division_id', 'district_id', 'SERIAL_NO_UNIT', 'NAME_OF_UNIT', 'NAME_OF_MAHALLAH','NAME_OF_HOUSE', 'NO_NAME_OF_ROAD', 'FLOOR_LEVEL',
	    'HOLIDING_NO', 'PHONE', 'FAX', 'EMAIL', 'WEBSITE') 
		values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`);

		stmt.run(Census.division_id,
			Census.district_id,
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
			Census.WEBSITE
		);

		store.emit('data-updated');
	});
}

store.editCensus = (catId, Census) => {
	db.serialize(function () {
		db.run(`update census set 
		division_id=?, 
		district_id=?, 
		SERIAL_NO_UNIT=?, 
		NAME_OF_UNIT=?, 
		NAME_OF_MAHALLAH=?,
		NAME_OF_HOUSE=?,
		NO_NAME_OF_ROAD=?,
		FLOOR_LEVEL=?,
		HOLIDING_NO=?,
		PHONE=?,
		FAX=?,
		EMAIL=?,
		WEBSITE=?  
		where ID=?`,
			{
				1: Census.division_id,
				2: Census.district_id,
				3: Census.SERIAL_NO_UNIT,
				4: Census.NAME_OF_UNIT,
				5: Census.NAME_OF_MAHALLAH,
				6: Census.NAME_OF_HOUSE,
				7: Census.NO_NAME_OF_ROAD,
				8: Census.FLOOR_LEVEL,
				9: Census.HOLIDING_NO,
				10: Census.PHONE,
				11: Census.FAX,
				12: Census.EMAIL,
				13: Census.WEBSITE,
				
				14: Census.ID
			});
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
