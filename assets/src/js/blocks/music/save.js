/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class musicSave extends Component {

	render() {
		const { attributes, className } = this.props;
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

        return (
            <div className="music-block" style={backgroundStyle}>
                <div className="container">
                    <div className='heading-wrap'>
                        <RichText.Content
                            tagName="h2"
                            value={ heading }
                            style={headingStyle}
                        />
                    </div>
                    <div className='music-wrap'>
                        {(!link1 && !link2 && !link3) &&
                            <h3>Nothing to display. Please provide embed code in block panel.</h3>
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
        );
	}
}
