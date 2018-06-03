
// Adapted from THREE.js

class EventDispatcher {

	addEventListener( types, listener ) {

		if ( types instanceof Array ) return types.forEach( type => this.addEventListener( type, listener ) );

		if ( typeof types === "string" ) {

			if ( types.includes( " " ) ) return types.split( " " ).forEach( type => this.addEventListener( type, listener ) );

			if ( this._listeners === undefined ) Object.defineProperty( this, "_listeners", { value: {} } );

			if ( this._listeners[ types ] === undefined )
				this._listeners[ types ] = [];

			if ( ! this._listeners[ types ].includes( listener ) )
				this._listeners[ types ].push( listener );

			return;

		}

		if ( this._listenersRegExp === undefined ) Object.defineProperty( this, "_listenersRegExp", { value: [] } );

		this._listenersRegExp.push( [ types, listener ] );

	}

	hasEventListener( type, listener ) {

		if ( this._listeners === undefined ) return;

		return this._listeners[ type ] !== undefined && this._listeners[ type ].includes( listener );

	}

	removeEventListener( types, listener ) {

		if ( this._listeners === undefined ) return;

		if ( types instanceof Array ) return types.map( type => this.removeEventListener( type, listener ) );
		if ( types.includes( " " ) ) return types.split( " " ).map( type => this.removeEventListener( type, listener ) );

		if ( this._listeners[ types ] === undefined ) return;

		const index = this._listeners[ types ].indexOf( listener );
		if ( index !== - 1 ) this._listeners[ types ].splice( index, 1 );

	}

	dispatchEvent( type, event, ...args ) {

		if ( ! type ) return;

		if ( typeof type !== "string" ) {

			args.unshift( event );
			event = type;
			type = type.type;

			if ( ! type ) return;

		}

		if ( typeof event === "object" ) {

			event.target = this;
			event.type = type;

		} else if ( event === undefined ) event = { type, target: this };

		// String listeners
		if ( this._listeners ) {

			const arr = this._listeners[ type ];
			if ( arr !== undefined && arr.length > 0 ) {

				const clone = arr.slice( 0 );

				for ( let i = 0; i < clone.length; i ++ )
					clone[ i ].call( this, event, ...args );

			}

		}

		// RegExp listeners
		if ( this._listenersRegExp ) {

			const clone = this._listenersRegExp.slice( 0 );

			for ( let i = 0; i < clone.length; i ++ )
				if ( clone[ i ][ 0 ].test( type ) )
					clone[ i ][ 1 ].call( this, event, ...args );

		}

	}

}

export default EventDispatcher;
