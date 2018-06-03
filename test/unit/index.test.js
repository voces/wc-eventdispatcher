
import assert from "assert";
import EventDispatcher from "../../src/EventDispatcher.js";

export default () => describe( "EventDispatcher", function () {

	this.timeout( 10 );

	it( "#addEventListener", () => {

		const ed = new EventDispatcher();
		const listener = () => {};

		assert.equal( ed._listeners, undefined, "Property shouldn't exist before adding listeners" );
		ed.addEventListener( "test", listener );
		assert.equal( typeof ed._listeners, "object", "_listeners not created" );
		assert.equal( ed._listeners.test[ 0 ], listener, "Callback not added" );

		ed.addEventListener( "test1 test2", listener );
		assert.equal( ed._listeners.test1[ 0 ], listener, "Callback not added" );
		assert.equal( ed._listeners.test2[ 0 ], listener, "Callback not added" );

		ed.addEventListener( [ "test3", "test4" ], listener );
		assert.equal( ed._listeners.test3[ 0 ], listener, "Callback not added" );
		assert.equal( ed._listeners.test4[ 0 ], listener, "Callback not added" );

		const regexp = /^test$/;
		assert.equal( ed._listenersRegExp, undefined, "Property shouldn't exist before adding regexp listeners" );
		ed.addEventListener( regexp, listener );
		assert.equal( typeof ed._listenersRegExp, "object", "_listenersRegExp not created" );
		assert.equal( ed._listenersRegExp[ 0 ][ 0 ], regexp, "Callback not added" );
		assert.equal( ed._listenersRegExp[ 0 ][ 1 ], listener, "Callback not added" );

	} );

	it( "#hasEventListener", () => {

		const ed = new EventDispatcher();
		const listener = () => {};

		assert.ok( ! ed.hasEventListener( "test", listener ), "Listener found before adding" );
		ed.addEventListener( "test", listener );
		assert.ok( ed.hasEventListener( "test", listener ), "Listener not found" );
		assert.ok( ! ed.hasEventListener( "test2", listener ), "Another listener found" );

	} );

	it( "#removeEventListener", () => {

		const ed = new EventDispatcher();
		const listener = () => {};

		ed.addEventListener( "test", listener );
		ed.removeEventListener( "test", listener );
		assert.ok( ! ed.hasEventListener( "test", listener ), "Listener found after removing" );

	} );

	it( "#dispatchEvent (string)", done => {

		const ed = new EventDispatcher();
		const listener = () => done();

		ed.addEventListener( "test", listener );
		ed.dispatchEvent( "test" );

	} );

	it( "#dispatchEvent (regexp)", done => {

		const ed = new EventDispatcher();
		const listener = () => done();

		ed.addEventListener( /^test$/, listener );
		ed.dispatchEvent( "test" );
		ed.dispatchEvent( "test2" );

	} );

} );
