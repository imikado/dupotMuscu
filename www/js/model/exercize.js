var oModelExercize={
	init:function(id_){
		this.storageId='exercize_list_'+id_;

		var sData=localStorage.getItem(this.storageId);
		this.tData=Array();
		if(sData){
			this.tData=JSON.parse( sData );
		}
	},
	getList:function(){
		return this.tData;
	},
	getListFor:function(id_){
		var sData=localStorage.getItem('exercize_list_'+id_);
		var tData=Array();
		if(sData){
			tData=JSON.parse( sData );
		}
		return tData;
	},
	add:function(obj_){
		this.tData.push(obj_);

		localStorage.setItem(this.storageId,JSON.stringify(this.tData));
	},
	find:function(id_){
		return this.tData[id_];
	},
	update:function(id_,obj_){
		this.tData[id_]=obj_;

		localStorage.setItem(this.storageId,JSON.stringify(this.tData));
	},

	findByProgramAndId:function(iProgram_,id_){
		var sData=localStorage.getItem('exercize_list_'+iProgram_);
		var tData=Array();
		if(sData){
			tData=JSON.parse( sData );

			return tData[id_];
		}
	},
}
