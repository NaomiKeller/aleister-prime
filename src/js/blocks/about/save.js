/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class aboutSave extends Component {

	render() {
		const { attributes, className } = this.props;
        const {
            heading,
            headingColor,
            backgroundColor1,
            backgroundColor2,
            imageSelect,
            description,
            descColor,
        } = attributes;

        const headingStyle = {};
        headingColor && (
            headingStyle.color = headingColor
        );

        const descStyle = {};
        descColor && (
            descStyle.color = descColor
        );

        const backgroundStyle = {};
        backgroundColor1 && (
            backgroundStyle.background = 'linear-gradient(180deg, '+backgroundColor1+', '+backgroundColor2+')'
        );

        return (
            <div className="about-block" style={backgroundStyle}>
                <div className="container">
                    <div className='heading-wrap'>
                        <RichText.Content
                            tagName="h2"
                            value={ heading }
                            style={headingStyle}
                        />
                    </div>
                    <div className='about-content'>
                        <div className="col">
                            <img src={imageSelect.url} alt={imageSelect.alt} width={imageSelect.width} height={imageSelect.height} />
                        </div>
                        <div className="col text">
                            <RichText.Content
                                tagName="p"
                                value={ description }
                                style={descStyle}
                            />
                        </div>
                    </div>
                    <div className="about-spacer"></div>
                </div>
            </div>
        );
	}
}
