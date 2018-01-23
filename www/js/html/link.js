function Link(){
	this.tLink=Array();
}
Link.prototype={
	add:function(sLink_,sLabel_){
		var oLine={};
		oLine.link=sLink_;
		oLine.label=sLabel_;

		this.tLink.push(oLine);

	},

	render:function(){
		var sHtml='<ul>';

		for(var i in this.tLink){
			sHtml+='<li><a href="#" onclick="'+this.tLink[i].link+'">'+this.tLink[i].label+'</a></li>';
		}

		sHtml+='</ul>';

		return sHtml;
	},
};
