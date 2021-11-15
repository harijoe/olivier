import { AppContext } from 'context';
import React, { useContext } from 'react';
import { Button } from 'react-native';
import feathers from 'services/feathers';

const RoomPicker = () => {
  const { auth } = useContext(AppContext);

  return (
    <>
      {[
        'avatars_0001_CARLOS',
        'avatars_0002_SNOOP',
        'avatars_0003_KANYE',
        'avatars_0004_FARMER',
        'avatars_0005_BOOBA',
        'avatars_0006_ELTON',
        'avatars_0007_KEITH',
        'avatars_0008_FREDDIE',
        'avatars_0010_BEYONCE',
        'avatars_0011_ANGELE',
        'avatars_0012_AMY',
        'avatars_0013_CELINE',
        'avatars_0014_GAGA',
        'avatars_0015_VANESSA',
        'avatars_0016_EMINEM',
        'avatars_0017_JUSTIN',
        'avatars_0018_BRITNEY',
        'avatars_0019_ELVIS',
        'avatars_0020_BOWIE',
        'avatars_0021_AYA',
        'avatars_0022_JOJO',
        'avatars_0023_MIREILLE',
      ].map(avatar => (
        <Button
          title={avatar}
          onPress={async () => {
            await feathers.service('users').patch(auth.user._id, { avatar });
          }}
        />
      ))}
    </>
  );
};

export default RoomPicker;
