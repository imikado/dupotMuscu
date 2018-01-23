var oModelSession={
	init:function(id_){
		this.storageId='session_list_'+id_;

		var sData=localStorage.getItem(this.storageId);
		this.tData=Array();
		if(sData){
			this.tData=JSON.parse( sData );
		}
	},
	getList:function(){
		return this.tData;
	},
	add:function(obj_){
		this.tData.push(obj_);

		localStorage.setItem(this.storageId,JSON.stringify(this.tData));
	},
	find:function(id_){
		return this.tData[id_];
	},
}
