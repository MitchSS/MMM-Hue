# Module: MMM-Hue
The `MMM-Hue` module is a third party module for MagicMirror. It is a simple way to display the status of groups or lights in your Philips Hue setup.

## Installing the Module
Navigate into your MagicMirror's modules folder and execute <br>
`git clone https://github.com/MitchSS/MMM-Hue.git`
## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
{
		    module: 'MMM-Hue',
		    position: 'top_right',
		    config: {
			bridgeip: "192.168.1.1",
			userid: "my user id",
			colour: false
		    }
}
````
Please visit [Philips Hue API page](https://www.developers.meethue.com/documentation/getting-started) to get an userid.

## Configuration options

The following properties can be configured:

| Option | Description |
| --- | --- |
| `bridgeip` | The ip address of your Philips Hue Bridge. <br>**Type:** `string` |
| `userid` | This is the user id created to access your Philips Hue Bridge. See here for more details - http://www.developers.meethue.com/documentation/getting-started	<br>**Type:** `string` |
| `colour` | This boolean determines whether the icons should be displayed in colour when the lights are on in a given room. <br>**Type:** `boolean` |
| `refreshTime` | How often should the lamp states refreshed  <br>**Type:** `number` <br>**Default:** 60 * 10000 |
| `lightsorgroups` | Should the module show groups or lights <br>**Type:** `string` <br>**Default:** "groups" |
| `showOnlyOn` | If set to true the module shows only the lights which are on <br>**Type:** `boolean` | false |
| `hideSpecificGroups` | Ignore some groups by a given string (requires hideGroupsWithString option) <br>**Type:** `boolean` <br>**Default:** false |
| `hideGroupsWithString` | Ignore some groups which including this string (requires hideSpecificGroups option) <br>**Type:** `string` |
| `showLabel` | Show header label? <br>**Type:** `boolean` <br>**Default:** true |
