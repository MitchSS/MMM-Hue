# Module: MMM-Hue
The `MMM-Hue` module is a third party module for MagicMirror. It is a simple way to display the status of groups or lights in your Philips Hue setup.

##Installing the Module
Navigate into your MagicMirror's modules folder and execute <br>
`git clone https://github.com/MitchSS/MMM-Hue.git`
## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
{
		    module: 'MMM-Hue',
		    position: 'top_right',
		    config:{
                bridgeip: "192.168.1.1",
		        userid: "my user id",
                colour: false
            }
		}
````
Please visit [Philips Hue API page](https://www.developers.meethue.com/documentation/getting-started) to get an userid.

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	</thead>
	<tbody>

		<tr>
			<td><code>bridgeip</code></td>
			<td>The ip address of your Philips Hue Bridge.
			</td>
		</tr>
		<tr>
			<td><code>userid</code></td>
			<td>This is the user id created to access your Philips Hue Bridge.<br> See here for more details - http://www.developers.meethue.com/documentation/getting-started
			</td>
		</tr>
		<tr>
			<td><code>colour</code></td>
			<td>This boolean determines whether the icons should be displayed in colour when the lights are on in a given room.
			</td>
		</tr>
		<tr>
			<td><code>refreshTime</code></td>
			<td>How often should the lamp states refreshed</br> Default: 60 * 10000
			</td>
		</tr>
		<tr>
			<td><code>lightsorgroups</code></td>
			<td>Should the module show groups or lights</br> Default: "groups"
			</td>
		</tr>
		<tr>
			<td><code>showOnlyOn</code></td>
			<td>If set to true the module shows only the lights which are on</br> Default: false
			</td>
		</tr>
		<tr>
			<td><code>hideSpecificGroups</code></td>
			<td>Ignore some groups by a given string (requires hideGroupsWithString option)</br> Default: false
			</td>
		</tr>
		<tr>
			<td><code>hideGroupsWithString</code></td>
			<td>Ignore some groups which including this string (requires hideSpecificGroups option)
			</td>
		</tr>
		<tr>
			<td><code>showLabel</code></td>
			<td>Show header label?</br> Default: true
			</td>
		</tr>
	</tbody>
</table>
