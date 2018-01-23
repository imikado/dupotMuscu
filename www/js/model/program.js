var oModelProgram={
	init:function(){
		this.storageId='program_list';

		var sData=localStorage.getItem(this.storageId);
		this.tData=Array();
		if(sData){
			this.tData=JSON.parse( sData );
		}
	},
	getLength:function(){
		return this.tData.length;
	},
	getList:function(){
		return this.tData;
	},
	add:function(obj_){
		this.tData.push(obj_);

		localStorage.setItem(this.storageId,JSON.stringify(this.tData));
	},
	update:function(id_,obj_){
		this.tData[id_]=obj_;

		localStorage.setItem(this.storageId,JSON.stringify(this.tData));
	},
	find:function(id_){
		return this.tData[id_];
	},
}
oModelProgram.init();
