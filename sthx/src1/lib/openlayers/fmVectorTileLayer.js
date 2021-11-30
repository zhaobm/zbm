
goog.provide('ol.layer.fmVectorTileLayer');

ol.layer.fmVectorTileLayer = function(map, style, options){
	var that = this;
	
	that.map = map;
	that.styleMap = style || {};
	var tileOptions = Object.assign({}, options, {style: function(feature){
		return that.getStyle(feature);
	}});
	goog.base(this, tileOptions);
}

goog.inherits(ol.layer.fmVectorTileLayer, ol.layer.VectorTile);

ol.layer.fmVectorTileLayer.prototype.getStyle = function(feature){

	layerName=feature.get("layer");
    if(this.styleMap==null||layerName==null) 
    	return this.getDefaultStyles();

    var filterStyle = this.styleMap[layerName].filters;
    var defaultStyle = this.styleMap[layerName].defaults;
    var styles = [];
    if (filterStyle) {
        for (var i = 0,len = filterStyle.length; i < len; i++) {
            var _styleData = filterStyle[i];
            var ruleFlag=false;
            if(_styleData.ruleName==""){
            	ruleFlag=true;
            }
            else
            {
                var val = feature.get(_styleData.ruleName);
                if(!val)
                    val = feature.get(_styleData.ruleName.toLowerCase());
                if(!val)
                    val = feature.get(_styleData.ruleName.toUpperCase());
                var ruleValue=_styleData.ruleValue;
                var ruleArr=ruleValue.split(",");
                ruleArr.forEach(function(value,index){
                    if(value==val) {
                    	ruleFlag=true;
                    }	
                });
            }
            var _zoom = this.map.getView().getZoom();
            if (_styleData.minZoom > _zoom || _styleData.maxZoom < _zoom || ruleFlag==false) {
                continue;
            } else {
                styles.push(new ol.style.Style(this.createStyleJson(_styleData)));
            }
        }
    }
    if(styles.length == 0){
    	if(defaultStyle){
    		styles.push(new ol.style.Style(this.createStyleJson(defaultStyle)));
    	}
    }
    
    if(styles.length == 0){
    	return this.getDefaultStyles();
    }
    	
    return styles;
}

ol.layer.fmVectorTileLayer.prototype.createStyleJson = function(styleData){
	var _styleData = styleData;
	var _styleJson = {};
    var _zIndex = _styleData.zIndex;
    if (_zIndex) _styleJson.zIndex = _zIndex;

    var _fill = _styleData.fill;
    if (_fill) _styleJson.fill = new ol.style.Fill(this.getFillJson(_fill));

    var _stroke = _styleData.stroke;
    if (_stroke) _styleJson.stroke = new ol.style.Stroke(this.getStrokeJson(_stroke));

    var _image = _styleData.image;
    if (_image){
        if(_image.type=="Circle"){
            _styleJson.image = new ol.style.Circle(this.getCircleJson(_image));
        }
        if(_image.type=="Icon"){
            _styleJson.image = new ol.style.Icon(this.getIconJson(_image));
        }
        if(_image.type=="RegularShape"){
            _styleJson.image = new ol.style.RegularShape(this.getRegularShapeJson(_image));
        }
    }
    return _styleJson;
}

ol.layer.fmVectorTileLayer.prototype.getDefaultStyles = function() {
    var fill = new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    });
    var stroke = new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    });
    var styles = [
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 5
            }),
            fill: fill,
            stroke: stroke
        })
    ];
    return styles;
}

ol.layer.fmVectorTileLayer.prototype.getFillJson = function(data) {
    var json = {};
    if (data.color) json.color = data.color;
    return json;
};

ol.layer.fmVectorTileLayer.prototype.getStrokeJson = function(data) {
    var json = {};
    if (data.color) json.color = data.color;
    if (data.lineCap) json.lineCap = data.lineCap;
    if (data.lineJoin) json.lineJoin = data.lineJoin;
    if (data.lineDash) json.lineDash = data.lineDash;
    if (data.miterLimit) json.miterLimit = data.miterLimit;
    if (data.width) json.width = data.width;
    return json;
};

ol.layer.fmVectorTileLayer.prototype.getCircleJson = function(data) {
    var json = {};
    if (data.fill) json.fill = new ol.style.Fill(this.getFillJson(data.fill));
    if (data.radius) json.radius = data.radius;
    if (data.snapToPixel) json.snapToPixel = data.snapToPixel;
    if (data.stroke) json.stroke = new ol.style.Stroke(this.getStrokeJson(data.stroke));
    if (data.atlasManager) json.atlasManager = data.atlasManager;
    return json;
};

ol.layer.fmVectorTileLayer.prototype.getIconJson = function(data) {
    var json = {};
    if (data.anchor) json.anchor = data.anchor;
    if (data.anchorOrigin) json.anchorOrigin = data.anchorOrigin;
    if (data.anchorXUnits) json.anchorXUnits = data.anchorXUnits;
    if (data.anchorYUnits) json.anchorYUnits = data.anchorYUnits;
    if (data.crossOrigin) json.crossOrigin = data.crossOrigin;
    if (data.img) json.img = data.img;
    if (data.offset) json.offset = data.offset;
    if (data.offsetOrigin) json.offsetOrigin = data.offsetOrigin;
    if (data.opacity) json.opacity = data.opacity;
    if (data.scale) json.scale = data.scale;
    if (data.snapToPixel) json.snapToPixel = data.snapToPixel;
    if (data.rotateWithView) json.rotateWithView = data.rotateWithView;
    if (data.rotation) json.rotation = data.rotation;
    if (data.size) json.size = data.size;
    if (data.src) json.src = data.src;
    return json;
};

ol.layer.fmVectorTileLayer.prototype.getRegularShapeJson = function(data) {
    var json = {};
    if (data.fill) json.fill = new ol.style.Fill(this.getFillJson(data.fill));
    if (data.points) json.points = data.points;
    if (data.radius) json.radius = data.radius;
    if (data.radius1) json.radius1 = data.radius1;
    if (data.radius2) json.radius2 = data.radius2;
    if (data.angle) json.angle = data.angle;
    if (data.snapToPixel) json.snapToPixel = data.snapToPixel;
    if (data.stroke) json.stroke = new ol.style.Stroke(this.getStrokeJson(data.stroke));
    if (data.rotation) json.rotation = data.rotation;
    if (data.rotateWithView) json.rotateWithView = data.rotateWithView;
    if (data.atlasManager) json.atlasManager = data.atlasManager;
    return json;
};