import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EZContainer from '../../core/EZContainer';
import EZText from '../../core/EZText';
import {
  bgDefault,
  bgSecondaryDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../../assets/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AVATAR} from '../../../utils/defaultImage';
import {formatRelativeTime} from '../../../shared/handleDate';
import {EZButton, EZButtonText} from '../../core/EZButton';
import EZInput from '../../core/EZInput';
import {useCreateComment, useEditComment} from '../../../hooks/api/useComments';

const BookingHistoryFeedback = ({idParking}) => {
  const LIMITSTAR = 5;
  const STARS = 3;
  const {BG} = bgDefault();
  const {BG2ND} = bgSecondaryDefault();
  const mutationCreateComment = useCreateComment();
  const mutationEditComment = useEditComment();
  const [action, setAction] = useState('review');
  // todo: CRUD comment
  const [params, setParams] = useState({
    rating: 0,
    content: '',
  });
  const [errMess, setErrMess] = useState({
    rating: '',
    content: '',
  });
  const [starRating, setStarRating] = useState(
    [...Array(LIMITSTAR)].map(() => 'star-o'),
  );
  const handlePressRating = number => {
    let arrStar = [...Array(number + 1)].map(() => 'star');
    [...Array(LIMITSTAR - number + 1)].forEach(() => {
      arrStar.push('star-o');
    });
    setStarRating(arrStar);
    setParams({...params, ['rating']: number + 1});
  };
  const handleEdit = () => {
    console.log('Edit', validate());
  };
  const handleCreate = () => {
    console.log(validate());
  };
  const validate = () => {
    let check = true;
    let errMess = {
      rating: '',
      content: '',
    };

    if (params.content === '') {
      check = false;
      errMess.content = 'Required input!';
    }
    if (params.rating < 1 || params.rating > 5) {
      check = false;
      errMess.rating = 'Please rate star!';
    }
    setErrMess(errMess);
    return check;
  };
  return (
    <EZContainer
      styleEZContainer={{
        alignItems: 'center',
      }}>
      <EZText
        styleEZText={{
          backgroundColor: BG,
          paddingVertical: 15,
          width: '100%',
          textAlign: 'center',
          borderBottomWidth: 0.3,
          borderBottomColor: COLORS.borderInput,
        }}
        bold
        size="quiteLarge">
        Your review
      </EZText>
      <ScrollView style={styles.content}>
        {action === 'review' && (
          <View style={styles.containerFeedback}>
            <View style={styles.flexRowStartFlex}>
              <Image source={{uri: AVATAR}} style={styles.avatar} />
              <EZText bold>Your name</EZText>
            </View>
            <View style={styles.contentRight}>
              <View style={styles.flexRow}>
                <View style={styles.rating}>
                  {[...Array(STARS)].map((val, index) => (
                    <Icon
                      name="star"
                      size={FONTSIZE.iconMedium}
                      color={COLORS.yellow}
                      key={index}
                    />
                  ))}
                  {[...Array(LIMITSTAR - STARS)].map((val, index) => (
                    <Icon
                      name="star-o"
                      size={FONTSIZE.iconMedium}
                      color={COLORS.borderInput}
                      key={index}
                    />
                  ))}
                </View>
                <EZText color={COLORS.disable} size="small">
                  {formatRelativeTime(new Date())}
                </EZText>
              </View>
              <EZText textAlign="justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia itaque, dignissimos totam, quae rem labore molestias
                sapiente repellendus numquam veritatis officiis autem dolore quo
                impedit recusandae vitae optio hic quasi?
              </EZText>
              <EZButtonText
                text="Edit your review"
                color={COLORS.primary}
                handlePress={() => setAction('edit')}
              />
            </View>
          </View>
        )}
        {(action === 'edit' || action === 'create') && (
          <View style={styles.form}>
            <View style={styles.stars}>
              {[...Array(LIMITSTAR)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePressRating(index)}>
                  <Icon
                    name={starRating[index]}
                    size={FONTSIZE.iconHuge}
                    color={
                      starRating[index] === 'star'
                        ? COLORS.yellow
                        : COLORS.disable
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
            {errMess.rating && (
              <EZText color={COLORS.redLight} size="small">
                {errMess.rating}
              </EZText>
            )}
            <EZInput
              label="Write you review"
              errMess={errMess.content}
              styleEZInput={{marginVertical: SPACING.mbInputItem}}
              lines={5}
              placeholder="Write you review"
              defaultValue={params.content}
              onChangeText={newText =>
                setParams({...params, ['content']: newText})
              }
            />
            <EZButton
              title={action === 'edit' ? 'Edit review' : 'Post review'}
              handlePress={action === 'edit' ? handleEdit : handleCreate}
            />
          </View>
        )}
      </ScrollView>
    </EZContainer>
  );
};

export default BookingHistoryFeedback;

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  containerFeedback: {
    padding: SPACING.pxComponent,
    borderRadius: 6,
    marginBottom: 15,
    gap: 8,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  flexRowStartFlex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: COLORS.tertiary,
    borderWidth: 2,
  },
  contentRight: {
    width: '100%',
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: SPACING.mbInputItem,
  },
  form: {
    paddingHorizontal: SPACING.pxComponent,
    marginVertical: 20,
  },
});
