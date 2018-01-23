function Items(){
	this.tItems=Array();
}
Items.prototype={
	add:function(sLink_,sLabel_,iMaxWeight_,iMaxReps_){
		var oItem={};
		oItem.link=sLink_;
		oItem.label=sLabel_;
		oItem.maxWeight=iMaxWeight_;
		oItem.maxReps=iMaxReps_;

		this.tItems.push(oItem);

	},

	render:function(){
		var sHtml='<div class="list">';

		for(var i in this.tItems){
			sHtml+='<div class="block">';

				sHtml+='<h2>'+this.tItems[i].label+'</h2>';
				sHtml+='<p>&nbsp;</p>';
				if(this.tItems[i].maxWeight && this.tItems[i].maxReps){
					sHtml+='<p style="text-align:right"><a class="btn" href="#" onclick="oPages.exercize_editMax('+i+')">'+this.tItems[i].maxWeight+'Kg '+this.tItems[i].maxReps+'x </a></p>';
				}else{
					sHtml+='<p><a class="btn" href="#" onclick="oPages.exercize_editMax('+i+')"> MAX Kg  </a></p>';
				}
				//sHtml+='<li><a href="#" onclick="'+this.tItems[i].link+'">'+this.tItems[i].label+'</a></li>';

			sHtml+='</div>';

			sHtml+='<div class="clearbox"></div>'
		}

		sHtml+='</div>';

		return sHtml;
	},
};
