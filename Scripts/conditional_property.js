'use strict';

/**
 * WallpaperKey Conditional Property Script
 * 
 * Returns different values based on token validation state (valid vs invalid).
 * 
 * USAGE:
 * 1. Attach this script to any layer property (opacity, color, text, position, etc)
 * 2. Select property type in "Binded User Property" dropdown
 * 3. Set "Bind" values - used when token is valid
 * 4. Set "Default" values - used when token is invalid or missing
 * 
 * PROPERTY TYPES:
 * - Checkbox: Boolean values (true/false)
 * - Slider: Numeric values (for opacity, position, speed, etc)
 * - Text: String values (for labels, messages, status text)
 * - Color: Color values (for themes, highlights, tints)
 * 
 * HOW IT WORKS:
 * Reads wallpaperkey_valid shared variable.
 * If true: returns "Bind" value. If false/missing: returns "Default" value.
 */

export var scriptProperties = createScriptProperties()
	.addCombo({
		name: 'Title0',
		label: '',
		options: [{
			label: 'Conditional on Valid Token',
			value: '0'
		}]
	})
	.addCombo({
		name: 'property_type',
		label: 'Binded User Property',
		options: [
			{ label: 'Checkbox', value: 'checkbox' },
			{ label: 'Slider', value: 'slider' },
			{ label: 'Text', value: 'text' },
			{ label: 'Color', value: 'color' }
		]
	})
	
	// CHECKBOX properties
	.addCheckbox({
		name: 'bind_checkbox',
		label: 'Bind Checkbox',
		value: true
	})
	.addCheckbox({
		name: 'default_checkbox',
		label: 'Default Checkbox',
		value: false
	})
	
	// SLIDER properties
	.addSlider({
		name: 'bind_slider',
		label: 'Bind Slider',
		value: 1,
		min: 0,
		max: 1,
		integer: false
	})
	.addSlider({
		name: 'default_slider',
		label: 'Default Slider',
		value: 0,
		min: 0,
		max: 1,
		integer: false
	})
	
	// TEXT properties
	.addText({
		name: 'bind_text',
		label: 'Bind Text',
		value: 'Premium User'
	})
	.addText({
		name: 'default_text',
		label: 'Default Text',
		value: 'Free User'
	})
	
	// COLOR properties
	.addColor({
		name: 'bind_color',
		label: 'Bind Color',
		value: new Vec3(0, 1, 0)  // Green
	})
	.addColor({
		name: 'default_color',
		label: 'Default Color',
		value: new Vec3(1, 0, 0)  // Red
	})
	
	.finish();

/**
 * Returns the appropriate property value based on validation state
 * 
 * Logic:
 * - If token is valid (shared.wallpaperkey_valid === true)
 *   → Return "Bind" value (bind_*)
 * - If token is invalid or missing (false/undefined/"NaN")
 *   → Return "Default" value (default_*)
 * 
 * The property type is selected by the user in "Binded User Property" dropdown.
 * 
 * @returns {*} The selected property value (type depends on property_type)
 */
function getConditionalValue() {
	// Check validation state from shared variable
	const isValid = shared['wallpaperkey_valid'] === true;
	
	// Return appropriate value based on selected property type and validation state
	switch (scriptProperties.property_type) {
		case 'checkbox':
			return isValid ? scriptProperties.bind_checkbox : scriptProperties.default_checkbox;
		
		case 'slider':
			return isValid ? scriptProperties.bind_slider : scriptProperties.default_slider;
		
		case 'text':
			return isValid ? scriptProperties.bind_text : scriptProperties.default_text;
		
		case 'color':
			return isValid ? scriptProperties.bind_color : scriptProperties.default_color;
		
		default:
			// Fallback to checkbox default if property_type is somehow invalid
			return scriptProperties.default_checkbox;
	}
}

/**
 * Initialize the script
 * @param {*} value - Initial value from Wallpaper Engine
 * @returns {*} Current conditional value based on validation state
 */
export function init(value) {
	return getConditionalValue();
}

/**
 * Update loop - called every frame by Wallpaper Engine
 * @param {*} value - Current value from Wallpaper Engine
 * @returns {*} Current conditional value based on validation state
 */
export function update(value) {
	return getConditionalValue();
}

