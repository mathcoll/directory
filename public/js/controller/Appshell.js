'use strict';

class Appshell {
	constructor() {
		this.parser = new DOMParser();
		
	} //constructor


	
	
	setLayout(title) {
		let h1 = "<h1 class='header__title'>"+title+"</h1>";
		document.querySelector("header.header").appendChild( this.parser.parseFromString(h1, "text/html").body.firstChild );
	}
}