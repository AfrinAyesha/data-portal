import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ModuleConfig, RegistrationLoginModule } from 'src/modules/registration-login/registration-login.module';

export function ModuleConfigFactory(): ModuleConfig {
    return {
        baseURL: environment.baseURL,
        spaURL: environment.spaURL
    };
}

@NgModule({
    imports: [RegistrationLoginModule.forRoot()],
    providers: [
        {
            provide: ModuleConfig,
            useFactory: ModuleConfigFactory
        }
    ]
})

export class RegistrationLoginWrapperModule {}



