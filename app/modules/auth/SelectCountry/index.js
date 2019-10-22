import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { ListItem, Left, Right, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Base as BaseContainer } from '../../../components/containers';
import { TextM } from '../../../components/derivatives/Text';
import { Colors } from '../../../configs';
import Styles from './style';
import i18n from '../../../utils/i18n';
import {
  GET_LIST_COUNTRY_FAILED,
  GET_LIST_REFRESH_COUNTRY_SUCCESS,
  GET_LIST_REFRESH_COUNTRY_FAILED,
} from '../authConstants';
import {
  getListCountry,
  getListRefreshCountry,
  getListPagingCountry,
  setCountry,
} from '../authActions';

class SelectCountry extends Component {
  static propTypes = {
    action: PropTypes.string,
    getListCountry: PropTypes.func,
    getListRefreshCountry: PropTypes.func,
    getListPagingCountry: PropTypes.func,
    setCountry: PropTypes.func,
    getListCountryResponse: PropTypes.object,
    getListCountryFetch: PropTypes.bool,
    getListPagingCountryFetch: PropTypes.bool,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      refreshing: false,
    };

    this.renderMain = this.renderMain.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderLoadMore = this.renderLoadMore.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.setRefresh = this.setRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { getListCountry } = this.props;
    const { page } = this.state;
    getListCountry({ page });
  }

  componentDidUpdate(prevProps) {
    const { action } = this.props;
    if (prevProps.action !== action) {
      switch (action) {
        case GET_LIST_REFRESH_COUNTRY_SUCCESS:
          this.setRefresh();
          break;
        case GET_LIST_REFRESH_COUNTRY_FAILED:
          this.setRefresh();
          Toast.show(i18n.t('server_busy'), Toast.LONG);
          break;
        case GET_LIST_COUNTRY_FAILED:
          Toast.show(i18n.t('server_busy'), Toast.LONG);
          break;
        default:
      }
    }
  }

  onRefresh() {
    const { getListRefreshCountry } = this.props;
    this.setState({ page: 1 }, () => {
      getListRefreshCountry({ page: 1 });
    });
  }

  onEndReached() {
    if (!this.canAction) return;
    const { getListPagingCountry, getListCountryResponse } = this.props;
    const { page } = this.state;
    if (page < getListCountryResponse.last_page)
      getListPagingCountry({ page: page + 1 });
  }

  setRefresh() {
    this.setState({ refreshing: false });
  }

  goBack(data) {
    const { setCountry, navigation } = this.props;
    setCountry(data);
    navigation.pop();
  }

  renderItem(data) {
    const { navigation } = this.props;
    return (
      <ListItem
        selected={navigation.state.params.phoneCode === data.country_phone}
        onPress={() => this.goBack(data.country_phone)}
        key={data.country_phone}
      >
        <Left>
          <TextM
            style={{
              color:
                navigation.state.params.phoneCode === data.country_phone
                  ? Colors.main.selectedText
                  : Colors.main.baseBlack,
            }}
          >
            {data.country_name}
          </TextM>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  renderLoadMore() {
    const { getListPagingCountryFetch } = this.props;
    if (!getListPagingCountryFetch) return null;
    if (getListPagingCountryFetch) {
      return (
        <View style={Styles.list.loading}>
          <ActivityIndicator color={Colors.main.baseMain} size="large" />
        </View>
      );
    }
  }

  renderMain() {
    const { getListCountryFetch, getListCountryResponse } = this.props;
    const { refreshing } = this.state;
    if (getListCountryFetch) {
      return (
        <View style={Styles.list.loading}>
          <ActivityIndicator color={Colors.main.baseMain} size="large" />
        </View>
      );
    }

    return (
      <FlatList
        data={getListCountryResponse.data}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={this.renderLoadMore}
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onScrollBeginDrag={() => {
          this.canAction = true;
        }}
        onScrollEndDrag={() => {
          this.canAction = false;
        }}
        onMomentumScrollBegin={() => {
          this.canAction = true;
        }}
        onMomentumScrollEnd={() => {
          this.canAction = false;
        }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <BaseContainer
        title="Choose Country"
        onBackPress={() => navigation.pop()}
        backgroundColor={Colors.main.baseHome}
        topColor={Colors.main.baseHome}
        fixed
      >
        {this.renderMain()}
      </BaseContainer>
    );
  }
}

const mapStateToProps = state => ({
  action: state.auth.action,
  getListCountryFetch: state.auth.getListCountryFetch,
  getListRefreshCountryFetch: state.auth.getListCountryFetch,
  getListPagingCountryFetch: state.auth.getListPagingCountryFetch,
  getListCountryResponse: state.auth.getListCountryResponse,
});

const mapDispatchToProps = {
  getListCountry: payload => getListCountry(payload),
  getListRefreshCountry: payload => getListRefreshCountry(payload),
  getListPagingCountry: payload => getListPagingCountry(payload),
  setCountry: payload => setCountry(payload),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCountry);
