function SubLink(){
	this.tLink=Array();

	this.idTab='';
}
SubLink.prototype={
	addTitle:function(i_,name_){
		this.idTab=i_;

		this.tLink[this.idTab]={'name':name_,'tab':Array()};
	},

	add:function(j_,sLabel_,sLink_){

		var oLine={};
		oLine.id=j_;
		oLine.name=sLabel_;
		oLine.link=sLink_;

		this.tLink[this.idTab].tab.push(oLine);

	},

	render:function(){
		var sHtml='';
		sHtml+='<div class="sublinks">';

		console.log(this.tLink);

		for(var i in this.tLink ){
			var oItem=this.tLink[i];


			sHtml+='<h2>'+oItem.name+'</h2>';

			sHtml+='<ul>';

				for(var j in this.tLink[i].tab ){
					var oSubItem=this.tLink[i].tab[j];

					sHtml+='<li><a href="#" onclick="'+oSubItem.link+'">'+oSubItem.name+'</a></li>';

				}

			sHtml+='</ul>';

		}

		sHtml+='</div>';




		return sHtml;
	},
};
