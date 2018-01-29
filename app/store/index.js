import { EventEmitter } from 'events';

const store = new EventEmitter();

store.getAllCommonConfigList = function (cb, $table_name, $lang = 'en') {
	var list = [];

	db.each(`SELECT id, name
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
	census.serial_no_unit AS serial_no,
	census.name_of_unit AS name_of_unit,
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
		('division_id', 'district_id', 'serial_no_unit', 'name_of_unit', 'name_of_mahallah') 
		values(?, ?, ?, ?, ?)`);

		stmt.run(Census.division_id,
			Census.district_id,
			Census.serial_no_unit,
			Census.name_of_unit,
			Census.name_of_mahallah);

		store.emit('data-updated');
	});
}

store.editCensus = (catId, Census) => {
	db.serialize(function () {
		db.run(`update census set 
		division_id=?, 
		district_id=?, 
		serial_no_unit=?, 
		name_of_unit=?, 
		name_of_mahallah=?  
		where id=?`,
			{
				1: Census.division_id,
				2: Census.district_id,
				3: Census.serial_no_unit,
				4: Census.name_of_unit,
				5: Census.name_of_mahallah,
				6: Census.id
			});
		store.emit('data-updated');
	});
}

store.deleteCensus = (catId) => {
	db.serialize(function () {
		var stmt = db.prepare("delete from census where id=?");
		stmt.run(catId);
		store.emit('data-updated');
	});
}



export default store
