import { EventEmitter } from 'events';

const store = new EventEmitter();

store.getCensuses = function (cb) {
	var censuses = {};
	
	db.each("select * from census", function (err, row) {
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
