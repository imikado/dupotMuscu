function getById(id_){
	var a=document.getElementById(id_);
	if(a){
		return a;
	}
}
function hide(id_){
	getById(id_).setAttribute('style', 'display:none;');
}
function show(id_){
	getById(id_).setAttribute('style', 'display:block;');
}

var oXhr =null;

function callAjax(url_, tReplace_){
	var oDate=new Date();

	oXhr = new XMLHttpRequest();
	oXhr.onreadystatechange = function() {
		if (oXhr.readyState == 4 && (oXhr.status == 200 || oXhr.status == 0)) {

			var sText=oXhr.responseText

			if(tReplace_){
				for(var sPattern in tReplace_){
					var sPatternExp=sPattern.replace('$','\\$');
					sText=sText.replace( new RegExp(sPatternExp,'g'),tReplace_[sPattern] );
				}
			}

			getById('pages').innerHTML=sText;
		}
	};
	oXhr.open("GET", url_+'?'+oDate.getTime(), true);
	oXhr.send(null);
}


var oPages = {

	setProgramId(id_){
		this.program_id=id_;
	},
	setSessionId(id_){
		this.session_id=id_;
	},
	setExercizeId(id_){
		this.exercize_id=id_;
	},

    // Application Constructor
    initialize: function() {
		hide('loading');
		show('pages');

		this.menu();

		console.log('page initialize');
    },

	reset:function(){
		getById('pages').innerHTML='';
	},

	menu:function(){
		callAjax('view/menu.html');
	},

	//programs
	program_list:function(){
		var tProgram=oModelProgram.getList();

		if(tProgram){
			var oLink=new Link();
			for(var i in tProgram){
				oLink.add('oPages.exercize_list('+i+')','PROG '+tProgram[i].name);
			}

		}else{
			var oLink=null;
		}
		callAjax('view/program/list.html',{'$PROGRAM_LIST':oLink.render()} );
	},
	program_list_editable:function(){
		var tProgram=oModelProgram.getList();

		if(tProgram){
			var oLink=new Link();
			for(var i in tProgram){
				oLink.add('oPages.program_edit('+i+')','PROG '+tProgram[i].name);
			}

		}else{
			var oLink=null;
		}
		callAjax('view/program/list_editable.html',{'$PROGRAM_LIST':oLink.render()} );
	},
	program_edit:function(id_){
		var oProgram=oModelProgram.find(id_);
		if(oProgram){
			var sProgram=prompt('Nom du programme:',oProgram.name);

			if(sProgram){
				oProgram.name=sProgram;

				oModelProgram.update(id_,oProgram);

				this.reset();

				this.program_list();
			}
		}else{
			console.log('program i:'+id_+' not found');
		}

	},
	program_add:function(){

		var sProgram=prompt('Nom du programme:');

		if(sProgram){

			oModelProgram.add({'name':sProgram} );

			this.reset();

			this.program_list();

		}
	},

	/*
	session_list:function(id_){
		this.setProgramId(id_);

		var oProgram=oModelProgram.find(this.program_id );

		oModelSession.init(this.program_id);

		var tSession=oModelSession.getList();
		if(tSession){
			var oLink=new Link();
			for(var i in tSession){
				oLink.add('oPages.exercize_list('+i+')',tSession[i].name);
			}

		}else{
			var oLink=null;
		}

		callAjax('view/session/list.html',{
			'$PROGRAM_NAME':oProgram.name,
			'$SESSION_LIST':oLink.render(),
			'$PROGRAM_ID':this.program_id,
		});
	},
	*/

	//exercizes
	exercize_list:function(id_){
		this.setProgramId(id_);

		//this.setSessionId(id_);

		var oProgram=oModelProgram.find(this.program_id );

		//oModelSession.init(this.program_id );

		//var oSession=oModelSession.find(this.session_id );

		//oModelExercize.init(this.session_id );

		oModelExercize.init(this.program_id );

		var tExercize=oModelExercize.getList();
		if(tExercize){
			var oItem=new Items();
			for(var i in tExercize){
				oItem.add('oPages.exercize_show('+i+')',tExercize[i].name,tExercize[i].maxWeight,tExercize[i].maxReps);
			}

		}else{
			var oItem=null;
		}

		callAjax('view/exercize/list.html',{
			'$PROGRAM_NAME':oProgram.name,
			'$EXERCIZE_LIST':oItem.render(),
			'$PROGRAM_ID':this.program_id,
		});

	},
	exercize_list_editable:function(id_){
		this.setProgramId(id_);

		var oProgram=oModelProgram.find(this.program_id );

		oModelExercize.init(this.program_id );

		var tExercize=oModelExercize.getList();
		if(tExercize){
			var oItem=new Link();
			for(var i in tExercize){
				oItem.add('oPages.exercize_edit('+i+')',tExercize[i].name);
			}

		}else{
			var oItem=null;
		}

		console.log('program_id:'+this.program_id);

		callAjax('view/exercize/list_editable.html',{
			'$PROGRAM_NAME':oProgram.name,
			'$EXERCIZE_LIST':oItem.render(),
			'$PROGRAM_ID':this.program_id,
		});

	},
	exercize_edit:function(id_){
		var oExercize=oModelExercize.find(id_);
		if(oExercize){
			var sExercize=prompt('Nom de l exercice:',oExercize.name);

			if(sExercize){
				oExercize.name=sExercize;

				oModelExercize.update(id_,oExercize);

				this.reset();

				this.exercize_list(this.program_id );

				console.log('Exercize prompt : '+sExercize);
			}
		}else{
			console.log('exercze i:'+id_+' not found');
		}

	},
	exercize_add:function(programId_){
		var sExercize=prompt('Nom de l exercice:');

		if(sExercize){
			oModelExercize.add({'name':sExercize});

			this.reset();

			this.exercize_list(programId_);
		}
	},
	exercize_editMax:function(exercizeId_){

		var oExercize=oModelExercize.find(exercizeId_);

		var sMaxWeight=prompt('Max Kg ?',oExercize.maxWeight);
		if(sMaxWeight){
			var sMaxReps=prompt('Max repetitions ?',oExercize.maxReps);

			if(sMaxReps){

				oExercize.maxWeight=sMaxWeight;
				oExercize.maxReps=sMaxReps;

				oModelExercize.update(exercizeId_,{'name':oExercize.name,'maxWeight':oExercize.maxWeight,'maxReps':oExercize.maxReps});

				oModelHisto.init(this.program_id, exercizeId_);
				oModelHisto.add({'datetime':getYmd(),'maxWeight':oExercize.maxWeight,'maxReps':oExercize.maxReps});

				this.reset();

				this.exercize_list(this.program_id );
			}
		}
	},



	session_add:function(programId_){
		var sSession=prompt('Nom de la session:');

		if(sSession){
			oModelSession.add({'name':sSession});

			this.reset();

			this.session_list(programId_);
		}
	},

	histo_list:function(){
		var tProgram=oModelProgram.getList();

		if(tProgram){
			var oItem=new SubLink();

			for(var i in tProgram){

				tExercize=oModelExercize.getListFor(i);

				oItem.addTitle(i,tProgram[i].name);

				for(var j in tExercize){
					if(oModelHisto.exist(i,j) ){
						oItem.add(j,tExercize[j].name,'oPages.histo_show('+i+','+j+')');
					}
				}

			}
		}

		callAjax('view/histo/list.html',{
			'$HISTO_LIST':oItem.render(),
		});
	},


	histo_show:function(i_,j_){

		var iProgram=i_;
		var iExercize=j_;

		var oExercize=oModelExercize.findByProgramAndId(iProgram,iExercize);

		var iWindowWidth=window.screen.width;
		var sWindowWidth=iWindowWidth+'px';

		oModelHisto.init(i_,j_);
		var tHisto=oModelHisto.getList();

		var oChartLine=new ChartLine(iWindowWidth,iWindowWidth);

		//oChartLine.add('2018-01-20',11);

		for(var i in tHisto){
			oChartLine.add(tHisto[i].datetime,tHisto[i].maxWeight);
		}

		sCANVAS_SVG=oChartLine.getSvg();

		callAjax('view/histo/show.html',{
			'$EXERCIZE_NAME':oExercize.name,
			'$WINDOW_WIDTH':sWindowWidth,
			'$CANVAS_SVG':sCANVAS_SVG
		});



	},



}

function getYmd(){
	var oNow=new Date();

	var sYear=oNow.getFullYear();

	var sMonth='';
	var iMonth=(oNow.getMonth()+1);
	if(iMonth < 10){
		sMonth='0'+iMonth;
	}else{
		sMonth=iMonth;
	}

	var sDay='';
	var iDay=oNow.getDate();
	if(iDay < 10){
		sDay='0'+iDay;
	}else{
		sDay=iDay;
	}

	var sYmd=sYear+'-'+sMonth+'-'+sDay;
	return sYmd;
}
