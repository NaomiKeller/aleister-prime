/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import components
 */
import musicEdit from './edit';
import musicSave from './save';

registerBlockType("aleister-prime/music-slider", {
    title: __( "Embed Slider" ),
    description: __( "Slider for embedded content." ),
    icon: 'dashicons dashicons-slides aleister-dashicons',
    category: 'aleister-prime',
    attributes: {
        heading: {
            type: 'string',
            default: 'Latest Tracks',
        },
        headingColor: {
            type: 'string',
            default: 'white',
        },
        backgroundColor1: {
            type: 'string',
            default: '#121212'
        },
        backgroundColor2: {
            type: 'string',
            default: '#121212'
        },
        sliderArray: {
            type: 'array',
            default: []
        },
    },
    edit: musicEdit,
    save: musicSave,
});
