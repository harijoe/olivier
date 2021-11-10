export type Context = {
  auth: any;
  users: User[];
  session: Session;
  game: Game;
  library: Library;
  createGame: any;
  patchGame: any;
  connectToRoom: any;
  ready: boolean;
  room: Room;
  user: User;
};

export type User = {
  _id: string;
  pseudo: string;
  device: Device;
  room_id: string;
  session_id: string;
  avatar: string; // Id of the avatar
};

export type GameTeam = {
  name: string | null;
  default_name: string;
  players: string[];
  score: number;
  current_phase_score: number;
};

export type Session = {
  _id?: string;
  created_at: Date;
  games_ids: string[];
  updated_at: Date;
  end_at: Date;
  ended: boolean;
  room_id: string;
};

export type Game = {
  _id?: string;
  state: GameState;
  mode?: GameMode; // Either solo or team
  nb_of_players: number;
  nb_of_teams: number;
  players?: Player[];
  teams: GameTeam[]; // Repartition of the players ids into teams (team mode only)
  guess_type: GuessType;
  jukebox: Jukebox; // Specific parameters for song playing and synchronization
  phases: Phase[];
  current_phase: number;
  created_at: Date;
  updated_at: Date;
  session_id: string;
  playlists_carousel: {
    [key: string]: number; // key is category (boolean name in LE), number is index to begin carousel
  };
  bonus_malus_enabled: boolean;
  finishing: boolean;
  tuto_playing: boolean;
  tuto_visited: boolean;
};

export type Player = User & {
  current_phase_score: number;
  micro_open: boolean;
};

export const SHUFFLE_PLAYLIST_NAME = 'SHUFFLE';

export type Phase = {
  playlist?: number | 'SHUFFLE'; // Id of the playlist
  difficulty?: number;
  rounds: Round[]; // Every information about the game's rounds
  current_round: number;
};

export enum GuessType {
  MCQ = 'MCQ',
  SPEECH = 'SPEECH',
}

export type Round = {
  outcome: RoundOutcome | null;
  winning_player?: string;
  guesses: {
    [key: string]: Guess; // key is player id
  };
  song: Song;
  started_at?: Date;
  ended_at?: Date;
  malus: {
    [key: string]: Malus | null; // key is team index
  };
  bonus: {
    [key: string]: Bonus | null; // key is team index
  };
  message: string; // Displayed during countdown
  score_details?: ScoreDetails; // For test purposes
};

export type ScoreDetails = {
  speed_level: 'under_3' | 'under_5' | 'under_10' | null;
  speed_points: number;
  bonus_duo: number;
  bonus_multiplier: number;
  total: number;
};

export enum Malus {
  NO_MALUS = 'NO_MALUS',
  NOT_FIRST = 'NOT_FIRST',
  ONLY_ONE = 'ONLY_ONE',
  MALUS_IF_WRONG = 'MALUS_IF_WRONG',
  MICRO_10 = 'MICRO_10',
  MICRO_15 = 'MICRO_15',
}

export enum Bonus {
  BONUS_STEP_1 = 'BONUS_STEP_1',
  BONUS_STEP_2 = 'BONUS_STEP_2',
  BONUS_STEP_3 = 'BONUS_STEP_3',
}

export type Guess = {
  data: string;
  at: Date;
  guess_id: string;
  user_id: string;
};

export enum RoundOutcome {
  GUESSED = 'GUESSED',
  STOPPED_GUESSING = 'STOPPED_GUESSING',
}

export enum GameState {
  CREATED = 'CREATED', // Splash screen
  CHOOSE_NB_PLAYERS = 'CHOOSE_NB_PLAYERS',
  WAIT_PLAYERS = 'WAIT_PLAYERS', // Waiting lobby (if game mode has been set to solo)
  CHOOSE_MODE = 'CHOOSE_MODE',
  CHOOSE_NB_TEAMS = 'CHOOSE_NB_TEAMS',
  CREATE_TEAMS = 'CREATE_TEAMS', // Team creation (if game mode has been set to teams)
  CHOOSE_PLAYLIST = 'CHOOSE_PLAYLIST',
  CHOOSE_DIFFICULTY = 'CHOOSE_DIFFICULTY',
  START_PHASE = 'START_PHASE', // Splash screen before game
  ROUND_STARTING = 'ROUND_STARTING', // Countdown before round
  ROUND_PLAYING = 'ROUND_PLAYING',
  ROUND_ENDED = 'ROUND_ENDED',
  SCOREBOARD = 'SCOREBOARD',
  GAME_ENDED = 'GAME_ENDED',
}

export enum GameTransition {
  START = 'START',
  RETURN_CHOOSE_MODE = 'RETURN_CHOOSE_MODE',
  RETURN_CREATE_TEAMS = 'RETURN_CREATE_TEAMS',
  RETURN_WAIT_PLAYERS = 'RETURN_WAIT_PLAYERS',
  RETURN_CHOOSE_NB_TEAMS = 'RETURN_CHOOSE_NB_TEAMS',
  RETURN_CHOOSE_PLAYLIST = 'RETURN_CHOOSE_PLAYLIST',
  RETURN_CHOOSE_DIFFICULTY = 'RETURN_CHOOSE_DIFFICULTY',
  RETURN_START_PHASE = 'RETURN_START_PHASE',
  VALIDATE_CREATE_TEAMS = 'VALIDATE_CREATE_TEAMS',
  VALIDATE_NB_PLAYERS = 'VALIDATE_NB_PLAYERS',
  VALIDATE_NB_TEAMS = 'VALIDATE_NB_TEAMS',
  VALIDATE_WAIT_PLAYERS = 'VALIDATE_WAIT_PLAYERS',
  VALIDATE_CHOOSE_DIFFICULTY = 'VALIDATE_CHOOSE_DIFFICULTY',
  VALIDATE_ROUND_STARTING = 'VALIDATE_ROUND_STARTING',
  VALIDATE_ROUND_ENDED = 'VALIDATE_ROUND_ENDED',
  VALIDATE_SCOREBOARD = 'VALIDATE_SCOREBOARD',
  VALIDATE_NEW_PHASE = 'VALIDATE_NEW_PHASE',
  END_PHASE = 'END_PHASE',
  END_GAME = 'END_GAME',
  SET_NB_PLAYERS = 'SET_NB_PLAYERS',
  SET_NB_TEAMS = 'SET_NB_TEAMS',
  SET_MODE = 'SET_MODE',
  SET_TEAMS = 'SET_TEAMS',
  SET_PLAYLIST = 'SET_PLAYLIST',
  SET_DIFFICULTY = 'SET_DIFFICULTY',
  SET_JUKEBOX = 'SET_JUKEBOX',
  SET_PLAYLISTS_CAROUSEL = 'SET_PLAYLISTS_CAROUSEL',
  SET_GUESS_TYPE = 'SET_GUESS_TYPE',
  SET_BONUS_MALUS_SWITCH = 'SET_BONUS_MALUS_SWITCH',
  STOP_GUESSING = 'STOP_GUESSING',
  GUESS = 'GUESS',
  MIC = 'MIC',
  PLAY_TUTO = 'PLAY_TUTO',
}

export enum GameMode {
  SOLO = 'SOLO',
  TEAM = 'TEAM',
}

export enum PlaylistCategories {
  under_30 = 'under_30',
  classic = 'classic',
  editorial = 'editorial',
}

export type GameEvent = {
  type: GameTransition;
  mode?: GameMode;
  teams?: GameTeam[];
  guess?: string;
  guess_id?: string;
  guess_type?: GuessType;
  players?: Player[];
  shallowMerge?: boolean;
  nb_of_players?: number;
  nb_of_teams?: number;
  phases?: Phase[];
  playlists_carousel?: {
    [key in PlaylistCategories]: number;
  };
  recording?: boolean;
};

export type Jukebox = {
  // Path of the current loaded song
  src: string;
  // Used for controller -> display messages - controller can force display position using "from"
  // We need to specify "updated_at" otherwise display doesn't know if from has changed or not
  // e.g. User clicks on "go to chorus" twice
  from: { updated_at: Date; at: number };
  volume: number;
  sfxVolume: number;
  // Is the song supposed to be playing
  playing: boolean;
  // Duration of the song
  // Used by the controller, display set duration when it loaded the song
  duration: number | null;
};

export type Library = {
  playlists: Playlist[];
};
// export type Library = {
//   categories: { name: string; playlists: Playlist[] }[];
// };

// Created from library.json
export type Playlist = {
  id: number;
  name: string;
  cover: string;
  songs: Song[];
  most_played: boolean;
  classic: boolean;
  editorial: boolean;
  under_30: boolean;
  manage_level: boolean;
  baseline?: string;
};

// Created from library.json
export type Song = {
  id: number;
  name: string;
  artist: string;
  target_answer: 'comment' | 'artist_name';
  artist_siri_col: string[];
  level: number;
  chorus_cue: number;
  qcm_1?: string;
  qcm_2?: string;
  qcm_3?: string;
  qcm_4?: string;
  qcm_ans?: string;
  bt_rating?: boolean;
  cover: string;
  file: string;
  type: 'solo' | 'duo' | 'band';
};

export enum Device {
  iphone = 'IPHONE',
  ipad = 'IPAD',
  screen = 'SCREEN',
}

export type Room = {
  _id: string;
  created_at: Date;
  updated_at: Date;
};

export const CONFIG_STATES = [
  GameState.CREATED,
  GameState.CHOOSE_NB_PLAYERS,
  GameState.CHOOSE_NB_TEAMS,
  GameState.WAIT_PLAYERS,
  GameState.CHOOSE_MODE,
  GameState.CREATE_TEAMS,
  GameState.CHOOSE_PLAYLIST,
  GameState.CHOOSE_DIFFICULTY,
];

export const PLAYING_STATES = [
  GameState.ROUND_STARTING,
  GameState.ROUND_PLAYING,
  GameState.ROUND_ENDED,
];
