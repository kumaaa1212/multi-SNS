import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Labels() {
  return (
    <div className='labels'>
    <Stack spacing={3} sx={{ width: 600 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={jLeagueTeams}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
          {...params}
          variant="standard"
          label="ラベル"
          placeholder="ラベルを追加"
          />
          )}
          />
    </Stack>
          </div>
  );
}

const jLeagueTeams = [
  { label: 'Cerezo Osaka', name: 'セレッソ大阪', league: 'J1リーグ' },
  { label: 'Kashima Antlers', name: '鹿島アントラーズ', league: 'J1リーグ' },
  { label: 'Urawa Red Diamonds', name: '浦和レッドダイヤモンズ', league: 'J1リーグ' },
  { label: 'Kashiwa Reysol', name: '柏レイソル', league: 'J1リーグ' },
  { label: 'FC Tokyo', name: 'FC東京', league: 'J1リーグ' },
  { label: 'Kawasaki Frontale', name: '川崎フロンターレ', league: 'J1リーグ' },
  { label: 'Yokohama F. Marinos', name: '横浜F・マリノス', league: 'J1リーグ' },
  { label: 'Shonan Bellmare', name: '湘南ベルマーレ', league: 'J1リーグ' },
  { label: 'Yokohama FC', name: '横浜FC', league: 'J1リーグ' },
  { label: 'Albirex Niigata', name: 'アルビレックス新潟', league: 'J1リーグ' },
  { label: 'Nagoya Grampus', name: '名古屋グランパス', league: 'J1リーグ' },
  { label: 'Kyoto Sanga F.C.', name: '京都サンガF.C.', league: 'J1リーグ' },
  { label: 'Gamba Osaka', name: 'ガンバ大阪', league: 'J1リーグ' },
  { label: 'Vissel Kobe', name: 'ヴィッセル神戸', league: 'J1リーグ' },
  { label: 'Sanfrecce Hiroshima', name: 'サンフレッチェ広島', league: 'J1リーグ' },
  { label: 'Avispa Fukuoka', name: 'アビスパ福岡', league: 'J1リーグ' },
  { label: 'Sagan Tosu', name: 'サガン鳥栖', league: 'J1リーグ' },
  { label: 'Blaublitz Akita', name: 'ブラウブリッツ秋田', league: 'J2リーグ' },
  { label: 'Montedio Yamagata', name: 'モンテディオ山形', league: 'J2リーグ' },
  { label: 'Vegalta Sendai', name: 'ベガルタ仙台', league: 'J2リーグ' },
];
