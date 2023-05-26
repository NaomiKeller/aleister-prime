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
            <div className="video-block" style={backgroundStyle}>
                <div className="container">
                    <div className='heading-wrap'>
                        <RichText.Content
                            tagName="h2"
                            value={ heading }
                            style={headingStyle}
                        />
                    </div>
                    {video &&
                        <div className='video-wrap'>
                            <div className="youtube-video" dangerouslySetInnerHTML={{__html: video}}></div>
                        </div>
                    }
                </div>
            </div>
        );
	}
}
