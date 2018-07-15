'use strict';

class Resource {
	constructor() {
		this.parser = new DOMParser();
		this.db;
		this.idbkr;
		this.objectStore;
		this.request;
		this.storageName = 'resources';
		this.dbName = 'directory';
		this.containers = {
			'add': 'resource-add',
			'view': 'resource-view',
			'list': 'resources',
		};
		this.titles = {
			'add': 'Resource Add',
			'view': 'Resource view',
			'list': 'Resources',
		};
	
		/*
		if ( !('indexedDB' in window) ) {
			if ( localStorage.getItem('settings.debug') == 'true' ) {
				console.log('[indexedDB]', 'This browser doesn\'t support IndexedDB.');
			}
		} else {
			db = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			idbkr = window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
			request = db.open(dbName, 1, function(upgradeDb) {
				if (!upgradeDb.objectStoreNames.contains(objectStore)) {
					objectStore = upgradeDb.createObjectStore(objectStore, { keyPath: 'id', autoIncrement: false });
					objectStore.createIndex("id", "id", { unique: true, autoIncrement: false });
				}
			});
			request.onerror = function(event) {
				console.log('[indexedDB]', 'Database is on-error: ' + event.target.errorCode);
			};
			request.onsuccess = function(event) {
				db = request.result;
				console.log('[indexedDB]', 'Database is on-success');
			};
			request.onupgradeneeded = function(event) {
				db = event.target.result;
				objectStore = db.createObjectStore(objectStore, {keyPath: "id", autoIncrement: false});
				objectStore.createIndex("id", "id", { unique: true, autoIncrement: false });
				console.log('[indexedDB]', 'Database is on-upgrade-needed');
			};
		}
		*/
	} //constructor


	
	
	
	
	addContainer(id) {
		let html= "<section role='heading' class='mdl-tabs__panel mdl-layout__tab-panel is-active' id='"+id+"'>" +
				"	<div class='mdl-grid mdl-cell--12-col'>" +
				"		<h2 class='mdl-card__title-text mdl-subheader-content'>"+this.titles.add+"</h2>" +
				"	</div>" +
				"	<div class='page-content mdl-grid mdl-grid--no-spacing'></div>" +
				"</section>";
		document.querySelector('main.main').appendChild( this.parser.parseFromString(html, "text/html").body.firstChild );
	}
	
	getAddEditForm(id, isEdit) {
		if ( !document.querySelector('section#'+this.containers.add) ) {
			this.addContainer(this.containers.add);
		}
		/*
		if ( true ) {
			// get Resource from LocalStorage
			var transaction = db.transaction([storageName], 'readwrite');
			var store = transaction.objectStore(storageName);
			var resource = { id: id, icon: '' };
			var request = store.add(resource);
			request.onsuccess = function(event) {
				console.log("DEBUG add(): success");
			}
			request.onerror = function(event) {
				console.log("DEBUG add(): error:"+event);
			}
		} else {
			// get Resource from server
			
		}
		*/
		let html= "<section class=\"mdl-grid mdl-cell--12-col\" data-id=\""+id+"\">" +
			"	<div class=\"mdl-cell--12-col mdl-card mdl-shadow--2dp\">" +
			"		<div class=\"mdl-list__item\">" +
			"			<span class='mdl-list__item-primary-content'>" +
			"				<i class=\"material-icons\"></i>" +
			"				<h2 class=\"mdl-card__title-text\"></h2>" +
			"			</span>" +
			"			<span class='mdl-list__item-secondary-action'>" +
			"				<button role='button' class='mdl-button mdl-js-button mdl-button--icon right showdescription_button' for='description-"+id+"'>" +
			"					<i class='material-icons'>expand_more</i>" +
			"				</button>" +
			"			</span>" +
			"		</div>" +
			"		<div class='mdl-cell--12-col hidden' id='description-"+id+"'>" +
			"			" +
			"		</div>" +
			"	</div>" +
			"</section>";
		document.querySelector('section#'+this.containers.add+' .page-content').appendChild( this.parser.parseFromString(html, "text/html").body.firstChild );
	}
	
	getListItem(object) {
		console.log("DEBUG", "getListItem");
		
	}
	
	list(filter) {
		console.log("DEBUG", "list");
		
	}
	
	add(object) {
		console.log("DEBUG", "add");
		
	}
	
	get(id) {
		console.log("DEBUG", "get");
		
	}
	
	edit(id) {
		console.log("DEBUG", "edit");
		
	}
}