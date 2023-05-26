/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

/**
 * Export component
 */
export default class heroSave extends Component {

	render() {
		const { attributes, className } = this.props;
        const {
            heading,
            headingFont,
            headingColorLeft,
            headingColorRight,
            headingFontSize,
            headingFontSizeMobile,
            headingFontWeight,
            headingGap,
            toggleHeadingBgColor,
            headingBgColor,
            headingBgColorOpacity,
            vertPadding,
            paddingLeft,
            paddingRight,
            borderRadius,
            mediaId,
            heroBgDim,
            dataArray,
        } = attributes;

        // Seperate heading
        var tmp = heading.split(" ");
        if (tmp.length > 1) {
            var headingRight = tmp[tmp.length-1];
            var headingLeft = tmp[0];
        }

        // Convert Hex to RGB
        const convertToRgb = (hex) => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
        }

        // Style objects
        const heroBgImg = {background: 'url('+mediaId+')', backgroundSize: 'cover', boxShadow: 'inset 0 0 0 5000px rgb(0 0 0 / '+heroBgDim+'%)'};
        const rgb = convertToRgb(headingBgColor);

        const headingStyle = {};
        (headingBgColor && toggleHeadingBgColor) && (
            headingStyle.background = 'rgba( '+ rgb.r +', '+ rgb.g +', '+ rgb.b +', '+ headingBgColorOpacity +')'
        );

        vertPadding && (
            headingStyle.paddingTop = vertPadding,
            headingStyle.paddingBottom = vertPadding
        );

        paddingLeft && (
            headingStyle.paddingLeft = paddingLeft,
            headingStyle.paddingRight = paddingRight
        );

        borderRadius && (
            headingStyle.borderRadius = borderRadius
        );

        headingFontWeight && (
            headingStyle.fontWeight = headingFontWeight
        );

        headingFont && (
            headingStyle.fontFamily = headingFont + ', sans-serif'
        );

        const headingLeftStyle = {};
        headingColorLeft && (
            headingLeftStyle.color = headingColorLeft,
            headingLeftStyle.fontSize = headingFontSize + 'px'
        );

        const headingRightStyle = {};
        headingColorRight && (
            headingRightStyle.color = headingColorRight,
            headingRightStyle.marginLeft = headingGap + 'px'
        );

        const headingStyleMobile = {};
        headingFontSizeMobile && (
            headingStyleMobile.fontSize = headingFontSizeMobile,
            headingStyleMobile.color = headingColorRight
        );

        const SocialLinksRender = dataArray?.map((data, index) => {
            return(
                <div className="item-container">
                    <a href={data.link} className={ data.icon + ' dashicons social-icon' }></a>
                </div>
            );
        });

        return (
            <div className="hero-block" style={heroBgImg}>
                <div className='heading-container'>
                    <h1 className="heading" style={{ ...headingLeftStyle, ...headingStyle }}>
                        {headingLeft}
                        <span style={ headingRightStyle }>{headingRight}</span>
                    </h1>
                    <h1 className="heading-mobile" style={{ ...headingLeftStyle, ...headingStyle, ...headingStyleMobile }}>
                        {heading}
                    </h1>
                </div>
                <div className='social-links'>
                    {SocialLinksRender}
                </div>
            </div>
        );
	}
}
