# Module: MMM-Hue
The `MMM-Hue` module is a third party module for MagicMirror. It is a simple way to display the status of groups or lights in your Philips Hue setup.
## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
{
		    module: 'MMM-Hue',
		    position: 'top_right',
		    config:{bridgeip: "192.168.1.1",
		        userid: "my user id"}
		}
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
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

	</tbody>
</table>
