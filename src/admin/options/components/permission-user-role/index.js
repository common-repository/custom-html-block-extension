/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { PanelBody, ToggleControl, __experimentalVStack as VStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '../../../index';

export default function PermissionUserRole() {
	const { options, setOptions } = useContext( AdminContext );

	const userRoles = window.chbeObj.userRoles || {};

	const onChange = ( role ) => {
		const newPermissionRoles = options.permissionRoles.includes( role )
			? options.permissionRoles.filter( ( item ) => item !== role )
			: [ ...options.permissionRoles, role ];

		const newOptions = {
			...options,
			permissionRoles: newPermissionRoles,
		};

		setOptions( newOptions );
	};

	return (
		<PanelBody
			title={ __( 'User roles allowed to use this extension', 'custom-html-block-extension' ) }
		>
			<VStack spacing={ 4 }>
				{ userRoles.map( ( role, index ) => (
					<ToggleControl
						__nextHasNoMarginBottom
						key={ index }
						label={ role.label }
						checked={ options.permissionRoles.includes( role.value ) }
						onChange={ () => onChange( role.value ) }
					/>
				) ) }
			</VStack>
		</PanelBody>
	);
}
