import React from 'react';
import { PluginComponent } from 'react-markdown-editor-lite';

import OutsideClickHandler from 'react-outside-click-handler';

const iconFoodList = [
  '🍎',
  '🍐',
  '🍊',
  '🍋',
  '🍌',
  '🍉',
  '🍇',
  '🍓',
  '🍈',
  '🥝',
  '🥑',
  '🍍',
  '🍒',
  '🍑',
  '🍆',
  '🥒',
  '🥕',
  '🌶',
  '🌽',
  '🍅',
  '🥔',
  '🍠',
  '🌰',
  '🥜',
  '🍯',
  '🥐',
  '🍞',
  '🥖',
  '🧀',
  '🥚',
  '🍳',
  '🥓',
  '🍤',
  '🍗',
  '🍖',
  '🍕',
  '🌭',
  '🍔',
  '🍟',
  '🥙',
  '🌮',
  '🌯',
  '🥗',
  '🥘',
  '🍝',
  '🍜',
  '🍲',
  '🍣',
  '🍱',
  '🍛',
  '🍚',
  '🍙',
  '🍘',
  '🍢',
  '🍡',
  '🍧',
  '🍨',
  '🍦',
  '🥞',
  '🍰',
  '🎂',
  '🍮',
  '🍭',
  '🍥',
  '🍬',
  '🍫',
  '🍿',
  '🍩',
  '🍪',
  '🍼',
  '🥛',
  '☕',
  '🍵',
  '🍶',
  '🍺',
  '🍻',
  '🥂',
  '🍷',
  '🥃',
  '🍸',
  '🍹',
  '🍾',
  '🥄',
  '🍴',
  '🍽',
];

const iconEmotionList = [
  '🙂',
  '😀',
  '😄',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😌',
  '😉',
  '😏',
  '😍',
  '😘',
  '😗',
  '😙',
  '😚',
  '🤗',
  '😳',
  '🙃',
  '😇',
  '😈',
  '😛',
  '😝',
  '😜',
  '😋',
  '🤤',
  '🤓',
  '😎',
  '🤑',
  '😒',
  '🙁',
  '☹️',
  '😞',
  '😔',
  '😖',
  '😓',
  '😢',
  '😢',
  '😭',
  '😟',
  '😣',
  '😩',
  '😫',
  '😕',
  '🤔',
  '🙄',
  '😤',
  '😠',
  '😡',
  '😶',
  '🤐',
  '😐',
  '😑',
  '😯',
  '😲',
  '😧',
  '😨',
  '😰',
  '😱',
  '😪',
  '😴',
  '😬',
  '🤥',
  '🤧',
  '🤒',
  '😷',
  '🤕',
  '😵',
  '🤢',
  '🤠',
  '🤡',
  '👿',
  '👹',
  '👺',
  '👻',
  '💀',
  '👽',
  '👾',
  '🤖',
  '💩',
  '🎃',
  '👍',
  '✌️',
  '♥️',
  '❤️',
  '💛',
  '💚',
  '💙',
  '💜',
  '🖤',
  '💖',
  '💝',
  '💔',
  '❣️',
  '💕',
  '💞',
  '💓',
  '💗',
  '💘',
];

class EmojiList extends React.Component {
  constructor(props) {
    super(props);
    this.props.handleSelectIcon.bind(this);
  }

  render() {
    return (
      <div className="emoji-list scroll-bar">
        <span className="uppercase font-medium">Đồ ăn, thức uống</span>
        <div className="flex flex-wrap">
          {iconFoodList.map((icon, index) => (
            <div key={index} onClick={() => this.props.handleSelectIcon(`${icon}`)} className="emoji">
              {icon}
            </div>
          ))}
        </div>
        <span className="uppercase font-medium">Biểu cảm</span>
        <div className="flex flex-wrap">
          {iconEmotionList.map((icon, index) => (
            <div key={index} onClick={() => this.props.handleSelectIcon(`${icon}`)} className="emoji">
              {icon}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default class EmojiPicker extends PluginComponent {
  static pluginName = 'emoji-picker';
  static align = 'left';
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
    this.handleSelectIcon = this.handleSelectIcon.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      show: false,
    };
  }

  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  handleSelectIcon(icon) {
    this.editor.insertText(icon);
  }

  render() {
    return (
      <span
        className="button button-type-emoji-picker"
        title="Emoji-Picker"
        onClick={() => this.setState({ show: true })}
      >
        😃
        {this.state.show && (
          <OutsideClickHandler onOutsideClick={() => this.setState({ show: false })}>
            <EmojiList handleSelectIcon={this.handleSelectIcon} />
          </OutsideClickHandler>
        )}
      </span>
    );
  }
}
