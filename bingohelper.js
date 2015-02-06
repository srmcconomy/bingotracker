var rowElements = {};
rowElements["row1"] = [1,2,3,4,5];
rowElements["row2"] = [6,7,8,9,10];
rowElements["row3"] = [11,12,13,14,15];
rowElements["row4"] = [16,17,18,19,20];
rowElements["row5"] = [21,22,23,24,25];
rowElements["col1"] = [1,6,11,16,21];
rowElements["col2"] = [2,7,12,17,22];
rowElements["col3"] = [3,8,13,18,23];
rowElements["col4"] = [4,9,14,19,24];
rowElements["col5"] = [5,10,15,20,25];
rowElements["tlbr"] = [1,7,13,19,25];
rowElements["bltr"] = [5,9,13,17,21];

function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$('#bingo').css('text-shadow', '1px 1px 1px black, -1px -1px 1px black, -1px 1px 1px black, 1px -1px 1px black');
$('#bingo').after('<div id=bingohelper>');
var $node = $('<a class="newcard">Difficulty</a>').click(dif);
$('#bingohelper').append($node);
$node = $('<a class="newcard">Child</a>').click(child);
$('#bingohelper').append($node);
$node = $('<a class="newcard">Dungeons</a>').click(dungeons);
$('#bingohelper').append($node);
$node = $('<a class="newcard">ZL</a>').click(zl);
$('#bingohelper').append($node);
$node = $('<a class="newcard">Clear</a>').click(klear);
$('#bingohelper').append($node);
$('#bingohelper').after('<div style="clear:both"></div>');

var bingoOpts = {
	seed: getUrlParameter('seed') || Math.ceil(999999 * Math.random()).toString(),
	mode: getUrlParameter('mode') || 'normal',
	lang: getUrlParameter('lang') || 'name'
};

var bingoBoard = ootBingoGenerator(bingoList, bingoOpts);

function dif() {
	for (var i=1; i<=25; i++) {
		$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(' + bingoBoard[i].difficulty*10 + ',' + (250 - bingoBoard[i].difficulty*10) + ',0,1)' });
	}
}
function child() {
	for (var i=1; i<=25; i++) {
		$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(0,0,0,0.6)' })
		if (bingoBoard[i].child === "yes") {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(255,255,0,0.6)' })
		}
	}
}
function zl() {
	for (var i=1; i<=25; i++) {
		$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(0,0,0,0.6)' })
		if (bingoBoard[i].types.indexOf("zl") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(255,255,0,0.6)' })
		}
	}
}
function klear() {
	for (var i=1; i<=25; i++) {
		$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(0,0,0,0.6)' })
		document.getElementById("slot"+i).style.background = "";
	}
}
function dungeons() {
	for (var i=1; i<=25; i++) {
		$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(0,0,0,0.6)' })
		if (bingoBoard[i].types.indexOf("deku") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(127,255,0,0.6)' })
		}
		if (bingoBoard[i].types.indexOf("dc") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(255,127,0,0.6)' })
		}
		if (bingoBoard[i].types.indexOf("jabu") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(0,255,255,0.6)' })
		}
		if (bingoBoard[i].types.indexOf("forest") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(0,255,127,0.6)' })
		}
		if (bingoBoard[i].types.indexOf("fire") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(255,0,0,0.6)' })
		}
		if (bingoBoard[i].types.indexOf("water") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(0,0,255,0.6)' })
		}
		if (bingoBoard[i].types.indexOf("shadow") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(127,0,255,0.6)' })
		}
		if (bingoBoard[i].types.indexOf("spirit") > -1) {
			$("#slot"+i).css({ '-webkit-box-shadow': 'inset 0px 0px 50px rgba(255,255,0,0.6)' })
		}
	}
}