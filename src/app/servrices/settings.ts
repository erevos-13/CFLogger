export namespace Settings{

  export namespace UserValues{
    export let USER_ID: string;
    export let ACCESS_TOKEN:string;
  }


  export namespace StorageValues{
    export const ACCESS_TOKEN: string = "access_token";
    export const REMEMBER_PASSWORD: string = 'remember_password';
    export const USER_ID: string = 'userId';
  }



  export namespace PIC_PATHS {
    export const PIC_USERS: string = 'UsersPic/picIrl';
  }


  export namespace METADATA_KEY {
    export const FIRST_NAME: string = 'personal_first_name';
    export const SURNAME: string = 'personal_surname';
    export const BOX: string = 'personal_box';
    export const EMAIL: string = 'personal_email';
    export const USER_NAME: string = 'username';
  }

  export enum RESOURCES_TYPES{
    NAME = 1,
    TITLE = 2,
    DESCRIPTION = 3,

  }

}// END CLASS
