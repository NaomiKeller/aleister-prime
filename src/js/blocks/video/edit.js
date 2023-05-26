/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { ColorPalette, PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class videoEdit extends Component {

    render() {
        const { attributes, setAttributes } = this.props;
        const { 
            heading,
            headingColor,
            backgroundColor1,
            backgroundColor2,
            video
        } = attributes;

        const headingStyle = {};
        headingColor && (
            headingStyle.color = headingColor
        );

        const backgroundStyle = {};
        backgroundColor1 && (
            backgroundStyle.background = 'linear-gradient(180deg, '+backgroundColor1+', '+backgroundColor2+')'
        );

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__("Color Settings")} initialOpen={false}>
                        <span className="panel-label">Heading Color</span>
                        <ColorPalette
                            value={ headingColor }
                            onChange={ ( headingColor ) => setAttributes({headingColor}) }
                        />
                        <span className="panel-label">Gradient Color 1</span>
                        <ColorPalette
                            value={ backgroundColor1 }
                            onChange={ ( backgroundColor1 ) => setAttributes({backgroundColor1}) }
                        />
                        <span className="panel-label">Gradient Color 2</span>
                        <ColorPalette
                            value={ backgroundColor2 }
                            onChange={ ( backgroundColor2 ) => setAttributes({backgroundColor2}) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="video-block" style={backgroundStyle}>
                    <div className="container">
                        <div className="heading-wrap">
                            <RichText
                                tagName="h2"
                                value={ heading }
                                onChange={ ( heading ) => setAttributes( { heading } ) }
                                placeholder={ __( 'Heading...' ) }
                                style={headingStyle}
                            />
                        </div>
                        <div className='video-wrap'>
                            {! video &&
                                <TextControl
                                    value={ video }
                                    placeholder="Enter Embed Code..."
                                    onChange={embed => setAttributes({video: embed})}
                                />
                            }
                            {video &&
                                <>
                                    <TextControl
                                        value={ video }
                                        placeholder="Enter Embed Code..."
                                        onChange={embed => setAttributes({video: embed})}
                                    />
                                    <div className="youtube-video" dangerouslySetInnerHTML={{__html: video}}></div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}