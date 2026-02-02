'use strict';

/**
 * WallpaperKey Bind Shared Value Script
 * 
 * Displays WallpaperKey shared variables in layer properties (text, opacity, etc).
 * 
 * USAGE:
 * 1. Attach this script to any layer property (text, opacity, position, etc)
 * 2. Select which shared variable to display in the dropdown
 * 3. The property will automatically update to show the current value
 * 
 * AVAILABLE SHARED VARIABLES:
 * - Valid: Boolean - true when token is valid
 * - Expired: Boolean - true when token has expired
 * - Error: String - error message or "NaN" if no error
 * - User ID: String - User ID or "NaN" if unavailable
 * - Custom ID: String - Optional custom identifier or "NaN" if not set
 * - Validated: String - ISO timestamp or "NaN" if not validated
 * - Token: String - JWT token (for display/debug)
 * - Wallpaper ID: String - configured wallpaper ID
 * - Public Key: String - configured public key
 * - IP: String - user's IP address or "NaN" if unavailable
 * - User Agent: String - user's User Agent or "NaN" if unavailable
 */

export var scriptProperties = createScriptProperties()
	.addCombo({
		name: 'Title0',
		label: '',
		options: [{
			label: 'Bind to Text Property',
			value: '0'
		}]
	})
	.addCombo({
		name: 'shared_value',
		label: 'Shared Value',
		options: [
			{ label: 'Valid', value: 'wallpaperkey_valid' },
			{ label: 'Expired', value: 'wallpaperkey_expired' },
			{ label: 'Error', value: 'wallpaperkey_error' },
			{ label: 'User ID', value: 'wallpaperkey_user_id' },
			{ label: 'Custom ID', value: 'wallpaperkey_custom_id' },
			{ label: 'Validated', value: 'wallpaperkey_validated' },
			{ label: 'Token', value: 'wallpaperkey_token' },
			{ label: 'Wallpaper ID', value: 'wallpaperkey_wallpaper_id' },
			{ label: 'Public Key', value: 'wallpaperkey_public_key' },
			{ label: 'IP', value: 'wallpaperkey_ip' },
			{ label: 'User Agent', value: 'wallpaperkey_user_agent' }
		]
	})
	.finish();

/**
 * Initialize the script
 * @param {*} value - Initial value from Wallpaper Engine
 * @returns {*} Current value of the selected shared variable
 */
export function init(value) {
	return shared[scriptProperties.shared_value];
}

/**
 * Update loop - called by Wallpaper Engine
 * @param {*} value - Current value from Wallpaper Engine
 * @returns {*} Current value of the selected shared variable
 */
export function update(value) {
	return shared[scriptProperties.shared_value];
}

