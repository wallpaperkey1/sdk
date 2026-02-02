# WallpaperKey SDK

Scene scripts for Wallpaper Engine that enable token-based access control and premium feature gating.

## Overview

The WallpaperKey SDK provides three scene scripts that enable token-based access control in Wallpaper Engine wallpapers. These scripts allow creators to gate premium features behind cryptographic access keys purchased through the WallpaperKey marketplace.

## About WallpaperKey

WallpaperKey is an independent marketplace not affiliated with Wallpaper Engine. The platform enables creators to monetize their wallpapers through flexible pricing models.

Creators can offer wallpapers as fully premium or provide a free base version with optional paid features. Users purchase cryptographic access keys that unlock premium features and work offline.

Visit [wallpaperkey.com](https://wallpaperkey.com) to learn more about the platform, pricing, and how it works.

## Who This Is For

- Wallpaper Engine creators using the WallpaperKey marketplace
- Developers implementing premium feature gates in wallpapers
- Anyone building token-based access control for Wallpaper Engine projects

## Scripts

### validate_key.js

The core validation script. Validates JWT tokens and publishes results to shared variables.

**Features:**
- RS256 JWT signature verification
- Embedded jsrsasign cryptographic library
- Token expiration checking
- Wallpaper ID verification
- localStorage persistence (tokens remain valid after expiration)
- Publishes validation results to shared variables (11 total)

**Usage:**
Attach to any layer. Configure your Wallpaper ID and Public Key. Users paste their token in the User Key property.

### bind_shared_value.js

Displays shared variables in layer properties for debugging and user feedback.

**Features:**
- Read any of the 11 shared variables
- Display in text, opacity, position, or other properties
- Real-time updates
- Supports IP and User Agent display

**Usage:**
Attach to any layer property. Select which shared variable to display. Useful for showing user IDs, errors, validation status, IP addresses, or User Agent information.

### conditional_property.js

Switches between two values based on token validation state.

**Features:**
- Conditional value switching (valid vs invalid)
- Supports Checkbox, Slider, Text, and Color properties
- Automatic updates when validation state changes

**Usage:**
Attach to any layer property. Select property type and configure "Bind" (valid) and "Default" (invalid) values. Script automatically switches based on token validity.

## Quick Start

0. **Check out the live example first** (see [Live Example](#live-example) section below)
1. Download all three scripts from the `Scripts/` folder in this repository
2. In Wallpaper Engine Editor:
   - Attach `validate_key.js` to any layer
   - Configure your Wallpaper ID and Public Key
3. Use `conditional_property.js` to control premium features
4. Use `bind_shared_value.js` for debugging

## Live Example

See the SDK in action with our live demonstration wallpaper:
**WallpaperKey Page**: https://wallpaperkey.com/wallpaper/sdk-example

This example wallpaper demonstrates:
- Basic SDK integration
- Access key validation
- Premium feature gating (customizable text)
- Token generation and testing

**To test it:**
1. Visit the WallpaperKey page and login
2. Download the example wallpaper and import it into Wallpaper Engine
3. Generate an access key (this is a special demo wallpaper that allows key generation for testing. Normal wallpapers require purchase)
4. Paste your access key in the wallpaper properties
5. See the premium "Customize Text" feature unlock

## Example Project

The `Simple SDK Usage Example` folder contains the complete Wallpaper Engine project source code for the demonstration wallpaper.

**To explore it:**  
Import the folder from this GitHub repository into Wallpaper Engine Editor to see a real implementation.

**What to look for:**  
Examine how all three scripts (`validate_key.js`, `conditional_property.js`, and `bind_shared_value.js`) are used together in practice. This is the best way to learn the implementation patterns you can copy for your own wallpapers.

## Token Validation Flow

```
validate_key.js
|
|--> Validates token
|--> Sets shared.wallpaperkey_valid = true/false
|
+--> conditional_property.js (controls premium features)
+--> bind_shared_value.js (displays status)
```

## Shared Variables

The validation script publishes these shared variables (11 total):

**Validation Results:**
- `wallpaperkey_valid` - Boolean: true if token is valid
- `wallpaperkey_expired` - Boolean: true if token has expired
- `wallpaperkey_error` - String: error message or "NaN"
- `wallpaperkey_validated` - String: ISO timestamp or "NaN"

**Token Information:**
- `wallpaperkey_token` - String: current token (for display)
- `wallpaperkey_wallpaper_id` - String: configured wallpaper ID
- `wallpaperkey_public_key` - String: configured public key
- `wallpaperkey_user_id` - String: User ID or "NaN"
- `wallpaperkey_custom_id` - String: Optional custom identifier or "NaN"

**Security Deterrent Fields:**
- `wallpaperkey_ip` - String: user's IP address or "NaN"
- `wallpaperkey_user_agent` - String: user's User Agent or "NaN"

Note: IP and User Agent are included in the token as a security deterrent to discourage key sharing.

## Token Persistence

The validation script automatically persists token validity using localStorage. This means:

- Once a token is validated, it remains valid even after expiration
- Users can continue customizing without interruption
- Token signature and wallpaper ID are still verified
- If the token changes, full validation occurs

This provides a seamless experience while maintaining security.

**Cache Behavior:**
- Cached validations persist forever (no expiration)
- Changing tokens clears the cache
- Each wallpaper has its own cache

**Special State:**
With token persistence enabled, `wallpaperkey_valid` can be `true` while `wallpaperkey_expired` is also `true`. This indicates the token has expired but the user retains access based on previous validation.

## Examples

### Example 1: Premium Layer Visibility

```
1. Attach conditional_property.js to layer opacity
2. Select "Slider" type
3. Bind Slider: 1.0 (visible)
4. Default Slider: 0.0 (hidden)

Result: Layer shows only with valid token
```

### Example 2: User ID Display

```
1. Attach bind_shared_value.js to text layer
2. Select "User ID" variable

Result: Displays User ID when token is valid
```

### Example 3: Premium Color Theme

```
1. Attach conditional_property.js to layer color
2. Select "Color" type
3. Bind Color: Vec3(1, 0.84, 0) (gold)
4. Default Color: Vec3(0.5, 0.5, 0.5) (gray)

Result: Gold theme with valid key, gray without
```

## Technical Details

- JWT algorithm: RS256 (RSA signature with SHA-256)
- Token format: Standard JWT with header.payload.signature
- Validation: Signature verification + expiration checking + wallpaper ID verification
- Cryptography: jsrsasign v11.1.0 (MIT License)

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

The embedded jsrsasign library is licensed under the MIT License.
Copyright (c) 2010-2023 Kenji Urushima

## Credits

- jsrsasign library by Kenji Urushima (MIT License)
- WallpaperKey SDK by the WallpaperKey team
