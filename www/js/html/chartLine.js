function ChartLine(width_,height_){
	this._width=width_;
	this._height=height_;


	this.iWidth=width_;
	this.iHeight=height_;

	this.sSvg='';

	this.iMaxX=0;
	this.iMaxY=0;

	this.iMinX=undefined;
	this.iMinY=0;

	this.tData=Array();

}
ChartLine.prototype={

	add:function(datetime_,weight_ ){

		var tab=datetime_.split('-');
		x_=( parseInt(tab[2]) + parseInt(tab[1])*30) + (parseInt(tab[0])*12*30);

		var y_=weight_;

		if(this.iMaxX < x_ ){
			this.iMaxX=x_;
		}
		if(this.iMaxY < y_ ){
			this.iMaxY=y_;
		}

		if(this.iMinX==undefined || this.iMinX > x_ ){
			this.iMinX=x_;
		}
		if(this.iMinY==undefined || this.iMinY > y_ ){
			this.iMinY=y_;
		}

		this.tData.push( {'x':x_,'y':y_,'datetime':datetime_} );
	},

	lineFromTo:function(x_,y_,x2_,y2_,sColor_){
		if(sColor_==undefined){
			sColor_='black';
		}
		this.sSvg+='<line x1="'+x_+'" y1="'+y_+'" x2="'+x2_+'" y2="'+y2_+'" ';
		this.sSvg+='style="stroke:'+sColor_+';stroke-width:4" stroke-opacity="1" />';
	},

	rect:function(x_,y_,iWidth_,iHeight_,sColor_){
		this.sSvg+='<rect class="chartRect" id="rect'+x_ +''+ y_+'" x="'+ x_ +'" y="'+ y_ +'" ';
		this.sSvg+='width="'+ iWidth_ +'" height="'+ iHeight_ +'" style="fill:'+sColor_+'">';
		this.sSvg+='</rect>';
	},

	circle:function(x_,y_,width_,stroke_,fill_){
		this.sSvg+='<circle cx="'+x_+'" cy="'+y_+'" r="'+width_+'" stroke="'+stroke_+'" stroke-width="3" fill="'+fill_+'" />';
	},

	circleWithInfo:function(x_,y_,iWidth_,sColor_,value_){

		this.circle(x_,y_,iWidth_,sColor_,sColor_);


		this.text(x_,(y_),value_,'white');
	},

	text:function(x_,y_,sText_,sColor_){

		this.sSvg+='<text text-anchor="middle" x="'+x_+'" y="'+y_+'" fill="'+sColor_+'">'+sText_+'</text>';
	},

	getSvg:function(){

		this.lineFromTo(0,0,0,this._height);
		this.lineFromTo(0,this._height,this._width,this._height);

		this.iMaxY=(this.iMaxY*2);

		if(this.iMinX==this.iMaxX){
			this.iMinX-=1;
		}

		var lastX=undefined;
		var lastY=undefined;

		var tNumber=Array();

		var marginX=25;


		for(var iData in this.tData){

			var x=this.tData[iData].x;
			var y=this.tData[iData].y;



			var x2=(( (x-this.iMinX) / (this.iMaxX-this.iMinX) )*(this.iWidth-(marginX*2)) )+marginX;
			console.log('x2'+x2);

			var y2=(1-(y-this.iMinY)/(this.iMaxY-this.iMinY))*this.iHeight;

			var x3=x2;
			var y3=y2;

			if(x3<=0){
				x3=0;
			}
			if(y3<=0){
				y3=0;
			}

			if(iData>0){
				this.lineFromTo(lastX,lastY,x2,y2,'blue');
			}

			tNumber.push({'x':x3,'y':y3,'width':12,'color':'blue','value':y});

			//this.circleWithInfo(x3,y3,12,'blue',y);

			lastX=x2;
			lastY=y2;


		}

		console.log('tNumber');
		console.log(tNumber);
		for(var i in tNumber){
			this.circleWithInfo(tNumber[i].x,tNumber[i].y,tNumber[i].width,tNumber[i].color,tNumber[i].value);
		}

		return this.sSvg;
	}


};
