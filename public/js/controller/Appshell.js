'use strict';

class Appshell {
	constructor() {
		this.parser = new DOMParser();
	} //constructor

	setLayout(title) {
		let h1 = "<h1 class='header__title'>"+title+"</h1>";
		document.querySelector("header.header").appendChild( this.parser.parseFromString(h1, "text/html").body.firstChild );
	}
	
	removeContent(id) {
		if (document.getElementById(id)) {
			document.getElementById(id).remove();
		}
		return;
	}
	
	setVisible(selector) {
		document.querySelectorAll("main.main section").forEach(function(section) {
			section.style.visibility = "hidden";
			section.style.display = "none";
		});
		if (document.querySelector(selector)) {
			document.querySelector(selector).style.visibility = "visible";
			document.querySelector(selector).style.display = "block";
		}
		return;
	}
	
	setContent(parent, id, content) {
		this.removeContent(id);
		document.querySelector(parent).appendChild( this.parser.parseFromString(content, "text/html").body.firstChild );
		this.setVisible("#"+id);
	}
	
	

	/* Atomic > Atoms */
	getButton(options) {
		var content = "";
		var attr = "";
		if ( options.ext == true ) {
			attr = " target='_blank' rel='noopener'";
		}
		content += "<a href='"+options.url+"' "+attr+" class='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect pull-right'>";
		content += "	<i class='material-icons'>launch</i>";
		content += 		options.label;
		content += "</a>";
		return content;
	}//-getButton
	
	getLabel(label, isClick) {
		var content = "";
		if (isClick!==false) content += "<a href='"+window.location.hash.split('?')[0]+"?label="+label+"'>";
		content += "	<span class='mdl-chip'>";
		content += "		<span class='mdl-chip__text'>"+label+"</span>";
		content += "	</span>";
		if (isClick!==false) content += "</a>";
		return content;
	}//-getLabel
	
	/* Atomic > Molecules */
	getCardAction(options) {
		var content = "";
		content += "<div class='card-footer'>";
		content += "	<div class='col-md-12'>";
		if (options.id) content += this.getLabel(options.id, false);
		if (options.url) content += this.getButton(options);
		content += "	</div>";
		content += "</div>";
		return content;
	}//-getCardAction
	
	/* Atomic > Organisms */
	getHeader(selector, options) {
		var content = "";
		content += "<div class='header-image'>";
		content += "	<div class='motto'>";
		if (options.title) content += "		<h1 class='title-uppercase'>"+options.title+"</h1>";
		if (options.subtitle) content += " 		<h3>"+options.subtitle+"</h3>";
		content += "	</div>";
		content += "</div>";
		
		if ( selector!==null && document.querySelector(selector) ) {
			document.querySelector(selector).appendChild( this.parser.parseFromString(content, "text/html").body.firstChild );
		} else {
			return this.parser.parseFromString(content, "text/html").body.firstChild;
		}
	}//-getHeader
	
	getFooterOnce(selector, options) {
		var content = "";
		content += "<footer class='footer section-dark'>";
		content += "	<div class='container'>";
        content += "    	<div class='copyright pull-right'>";
        content += "        	© 2018, Mathcoll";
        content += "    	</div>";
        content += "	</div>";
        content += "</footer>";

		if ( selector!==null && document.querySelector(selector) ) {
			document.querySelector(selector).appendChild( this.parser.parseFromString(content, "text/html").body.firstChild );
		} else {
			return this.parser.parseFromString(content, "text/html").body.firstChild;
		}
	}//-getFooterOnce
	
	getH1(selector, title, cols) {
		var content = "";
        if (cols) { content += "<div class='"+cols+"'>"; }
        content += "	<h2 class='card-title'>" + title + "</h2>";
        if (cols) { content += "</div>"; }
		
		if ( selector!==null && document.querySelector(selector) ) {
			document.querySelector(selector).appendChild( this.parser.parseFromString(content, "text/html").body.firstChild );
		} else {
			return this.parser.parseFromString(content, "text/html").body.firstChild;
		}
	}
	
	getCard(selector, options, cols) {
		var content = "";
		options.footer = options.footer!==undefined?options.footer:{};
		options.footer.id = options.footer.id!==undefined?options.footer.id:options.id;
		options.footer.url = options.footer.url!==undefined?options.footer.url:options.url;
		//console.log(options);
        if (cols) { content += "<div class='"+cols+"'>"; }
		content += "<div class='card'>";
		
        content += "	<div class='card-header card-header-" + options.color + "'>";
        if( options.type == 'websites' ) {options.icon = 'link'}
        if( options.type == 'articles' ) {options.icon = 'link'}
        if( options.type == 'sensors' ) {options.icon = 'usb'}
        if( options.type == 'devices' ) {options.icon = 'devices'}
        if( options.type == 'terms' ) {options.icon = 'title'}
        if (options.icon) {
        	//content += "	<div class='card-icon'>";
        	content += "		<i class='material-icons md-48'>" + options.icon + "</i>";
        	//content += "	</div>";
        }
        content += "	<h3 class='card-title'>" + options.title + "</h3>";

        content += "</div>";
		if (options.subtitle || options.labels) {
			content += "<div class='card-body'>";
			if (options.subtitle) content += options.subtitle;
			if (options.subtitle && options.labels) {
				content += "<br />";
			}
			if (options.labels) {
				var parent = this;
				(options.labels).forEach(function(l) {
					content += parent.getLabel(l, true);
				});
			}
			content += "</div>";
		}
		if (options.footer) { content += this.getCardAction(options.footer); }
		content += "</div>";
        if (cols) { content += "</div>"; }
		
		if ( selector!==null && document.querySelector(selector) ) {
			document.querySelector(selector).appendChild( this.parser.parseFromString(content, "text/html").body.firstChild );
		} else {
			return this.parser.parseFromString(content, "text/html").body.firstChild;
		}
	}//-getCard

	getWebsiteCard(selector, options, cols) {
		/* Alias */
		this.getCard("#type div.row", {title: options.title, subtitle: options.subtitle, labels: options.labels, url: options.url, color: options.color, icon: options.icon, footer: {icon: "link", label: options.title, link: options.url, ext: true}}, options.col);
	}//-getWebsiteCard
	
	getArticleCard(selector, options, cols) {
		/* Alias */
		this.getCard("#type div.row", {title: options.title, subtitle: options.subtitle, labels: options.labels, url: options.url, color: options.color, icon: options.icon, footer: {icon: "link", label: options.title, link: options.url, ext: true}}, options.col);
	}//-getArticleCard
	
	getSensorCard(selector, options, cols) {
		/* Alias */
		this.getCard("#type div.row", {title: options.title, subtitle: options.subtitle, labels: options.labels, url: options.url, color: options.color, icon: options.icon, footer: {icon: "link", label: options.title, link: options.url, ext: true}}, options.col);
	}//-getSensorCard
	
	getDeviceCard(selector, options, cols) {
		/* Alias */
		this.getCard("#type div.row", {title: options.title, subtitle: options.subtitle, labels: options.labels, url: options.url, color: options.color, icon: options.icon, footer: {icon: "link", label: options.title, link: options.url, ext: true}}, options.col);
	}//-getDeviceCard
	
	getTermCard(selector, options, cols) {
		/* Alias */
		this.getCard("#type div.row", {title: options.title, subtitle: options.subtitle, labels: options.labels, url: options.url, color: options.color, icon: options.icon, footer: {icon: "link", label: options.title, link: options.url, ext: true}}, options.col);
	}//-getTermCard
	
	getProfile(selector, options, cols) {
		var content = "";
		options.footer.id = options.id;
        if (cols) { content += "<div class='"+cols+"'>"; }
		content += "<div class='card card-profile'>";
		content += "	<div class='card-avatar'>";
		content += "		<a href=''><img class='img' src='"+options.profile.image+"'></a>";
		content += "	</div>";
		
		content += "	<div class='card-body'>";
		content += "		<h6 class='card-category text-gray'>"+options.profile.title+"</h6>";
		content += "		<h4 class='card-title'>"+options.profile.name+"</h4>";
		content += "		<p class='card-description'>"+options.profile.description+"</p>";
		content += "	</div>";
		if (options.footer) { content += this.getCardAction(options.footer); }
        if (cols) { content += "</div>"; }
		
		if ( selector!==null && document.querySelector(selector) ) {
			document.querySelector(selector).appendChild( this.parser.parseFromString(content, "text/html").body.firstChild );
		} else {
			return this.parser.parseFromString(content, "text/html").body.firstChild;
		}
	}//-getProfile
	
	getCardStat(selector, options, cols) {
		var content = "";
		options.footer.id = options.id;
        if (cols) { content += "<div class='"+cols+"'>"; }
		content += "<div class='card card-stats'>";
		content += "	<div class='card-header card-header-"+options.color+" card-header-icon'>";
		content += "		<div class='card-icon'>";
		content += "			<i class='material-icons'>"+options.icon+"</i>";
		content += "		</div>";
        if (options.title) content += "	<h3 class='card-title'>" + options.title + "</h3>";
		if (options.subtitle) content += "	<h4 class='card-category'>"+options.subtitle+"</h4>";
		content += "	</div>";
		if (options.footer) { content += this.getCardAction(options.footer); }
		content += "</div>";
        if (cols) { content += "</div>"; }
		
		if ( selector!==null && document.querySelector(selector) ) {
			document.querySelector(selector).appendChild( this.parser.parseFromString(content, "text/html").body.firstChild );
		} else {
			return this.parser.parseFromString(content, "text/html").body.firstChild;
		}
	}//-getCardStat
	
	getList(selector, options, cols) {
		
	}//-getList
}