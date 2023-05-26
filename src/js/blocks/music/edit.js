/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { ColorPalette, PanelBody, TextareaControl } from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class musicEdit extends Component {

    render() {
        const { attributes, setAttributes } = this.props;
        const { 
            heading,
            headingColor,
            backgroundColor1,
            backgroundColor2,
            link1,
            link2,
            link3,
        } = attributes;

        const headingStyle = {};
        headingColor && (
            headingStyle.color = headingColor
        );

        const backgroundStyle = {};
        backgroundColor1 && (
            backgroundStyle.background = 'linear-gradient(180deg, '+backgroundColor1+', '+backgroundColor2+')'
        );

        const removeStyle = /style="[^"]*"/;
        const removeSoundCloudDiv = /<div.*$/;

        function embedLink1(e) {
            let result = e.replace(removeStyle, "");
            result = result.replace(removeSoundCloudDiv, "");
            setAttributes({ link1: result });
        }

        function embedLink2(e) {
            let result = e.replace(removeStyle, "");
            result = result.replace(removeSoundCloudDiv, "");
            setAttributes({ link2: result });
        }

        function embedLink3(e) {
            let result = e.replace(removeStyle, "");
            result = result.replace(removeSoundCloudDiv, "");
            setAttributes({ link3: result });
        }

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
                    <PanelBody title={__("Embed")} initialOpen={true}>
                        <span className='panel-label description'>Supports Spotify and SoundCloud embeds.</span>
                        <TextareaControl
                            label="Embed 1"
                            value={ link1 }
                            onChange={ e => embedLink1(e) }
                        />
                        <TextareaControl
                            label="Embed 2"
                            value={ link2 }
                            onChange={ e => embedLink2(e) }
                        />
                        <TextareaControl
                            label="Embed 3"
                            value={ link3 }
                            onChange={ e => embedLink3(e) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="music-block" style={backgroundStyle}>
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
                        <div className='music-wrap'>
                            {(!link1 && !link2 && !link3) &&
                                <h3 style={headingStyle}>Nothing to display. Please provide embed code in block panel.</h3>
                            }
                            {link1 &&
                                <div className="col" dangerouslySetInnerHTML={{__html: link1}}></div>
                            }
                            {link2 &&
                                <div className="col" dangerouslySetInnerHTML={{__html: link2}}></div>
                            }
                            {link3 &&
                                <div className="col" dangerouslySetInnerHTML={{__html: link3}}></div>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}