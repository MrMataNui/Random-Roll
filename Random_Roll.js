var getId = function (id) {return document.getElementById(id);}
var makeElement = function (id) {return document.createElement(id);}

var die_roll;
var roll_average = [];
var total = 0;

window.onload = function() { init(); };
function init () { ask(); }
function ask () {
	getId('rand_num').onclick = function () {
		getId('rand_num').innerHTML = prompt('How many random numbers?');
		check();
	};
	getId('max_num').onclick = function () {
		getId('max_num').innerHTML = prompt('What is the maximum number?');
		check();
	};
	getId('ave_num').onclick = function () {
		getId('ave_num').innerHTML = prompt('Do you want the average? (Y or N)');
		check();
	};
	getId('reroll_num').onclick = function () {
		check();
	};

}
function check() {
	if (getId('rand_num').innerHTML != 'HOW MANY RANDOM NUMBERS?' && getId('max_num').innerHTML != 'MAXIMUM NUMBER?') {
//		if (isNaN(getId('rand_num').innerHTML) || isNaN(getId('max_num').innerHTML))
//			error('no num');
		if (getId('ave_num').innerHTML != 'DO YOU WANT THE AVERAGE?') {
			if (getId('number') || getId('table')) {
				while (getId('div1').firstChild) {
					getId('div1').removeChild(getId('div1').firstChild);
				}
//				if (getId('ave_num').innerHTML == '')
//					error('no average');
				roll_average = [];
				total=0;
			}
			switch (getId('ave_num').innerHTML.toLowerCase()) {
				case 'yes':
				case 'y':
					average(getId('rand_num').innerHTML, getId('max_num').innerHTML);
				case 'no': 
				case 'n': 
					rand(getId('rand_num').innerHTML, getId('max_num').innerHTML);
			}
		}
	}
}
function error (check) {
	if (check=='no num') {
		if (getId('number') || getId('table')) {
			while (getId('div1').firstChild) {
				getId('div1').removeChild(getId('div1').firstChild);
			}
			roll_average = [];
			total=0;
		}
		alert('You must enter a number.');
	} else if (check=='no average') {
		if (getId('number') || getId('table')) {
			while (getId('div1').firstChild) {
				getId('div1').removeChild(getId('div1').firstChild);
			}
			roll_average = [];
			total=0;
		}
		alert('You must decide if you want an average.');
	}
}
function new_p (id, t, loc) {
	var p = makeElement('p');
	p.setAttribute('id', id);
	var tex = document.createTextNode(t);
	p.appendChild(tex);
	getId(loc).appendChild(p);
}
function new_table (id, t1, t2, loc, num) {
	var body = document.getElementsByTagName('body')[0];
	var tbl = makeElement('table');
	tbl.setAttribute('id', id);
	var tex = document.createTextNode(t1);
	if (t2!=0) {var tex2 = document.createTextNode(t2);}
	var tbdy = makeElement('tbody');
	var tr = makeElement('tr');
	var td = makeElement('td');
	var td2 = makeElement('td');
	for (var col = 0; col < 2; col++) {
		td.appendChild(tex);
		if (t2!=0) {td2.appendChild(tex2);}
	}
	tr.appendChild(td);
	if (t2!=0) {tr.appendChild(td2);}
		//tbdy.appendChild(tr);
	tbl.appendChild(tr);
	body.appendChild(tbl)
	getId(loc).appendChild(tbl);
}
function rand (num, max) {
	var roll_holder;
	var roll_place;
		for (var i = 0; i < num; i++) {
			for (var j = 0; j < 1; j++) {
				if (j==0 && ((i+1)%2!=0)){
					roll(max);
					roll_holder = ('Roll #' + (i+1+j) + ' = ' + die_roll);
					if (i == (num-1)) {
						new_table('table', roll_holder, 0, 'div1', num);
						//new_p('number', roll_holder, 'div1');
						new_p('', '', 'div1');
					}
				} else {
					roll_place = roll_holder;
					roll(max);
					roll_holder = ('Roll #' + (i+1+j) + ' = ' + die_roll);
					new_table('table', roll_place, roll_holder, 'div1', num);
					//new_table('table', roll_holder, 'div1', num);
					new_p('', '', 'div1');
				}
				//console.log(roll_holder);
				//console.log(roll_place);
			}
		}
	}

function roll(max) {
		die_roll = Math.ceil(Math.random() * max);
		roll_average.push(die_roll);
}
function average (num, max) {
	for (var i = 0; i < num; i++) {roll(max);}
	for (var i = 0; i < roll_average.length; i++)
		total += roll_average[i];
	var averageA = ('The average of the ' + roll_average.length + ' rolls is ' + (total/roll_average.length).toFixed(2));
	var averageB = ('The roll is ' + (total/roll_average.length).toFixed(2));
	if (roll_average.length > 1) {new_p('number', averageA, 'div1'); new_p('', '', 'div1');}
	else if (roll_average.length == 1) {new_p('number', averageB, 'div1'); new_p('', '', 'div1');}
}