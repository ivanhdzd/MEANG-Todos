'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">meang-todos documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/ApolloAngularModule.html" data-type="entity-link">ApolloAngularModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AppClientModule.html" data-type="entity-link">AppClientModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' : 'data-target="#xs-components-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' : 'id="xs-components-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' }>
                                        <li class="link">
                                            <a href="components/AppClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppClientComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CreateTodoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateTodoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TodoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TodoFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodoFormComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TodoViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodoViewComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TodosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodosComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' : 'data-target="#xs-injectables-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' : 'id="xs-injectables-links-module-AppClientModule-2a65b929d0743955b805cdb4f381930c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TodoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TodoService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' : 'data-target="#xs-components-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' : 'id="xs-components-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ModalWindowConfirmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalWindowConfirmComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ModalWindowMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalWindowMessageComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SignInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignInComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SignUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' : 'data-target="#xs-injectables-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' : 'id="xs-injectables-links-module-AppModule-676ee910409434e7d6e7077339312bf1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/NgrxStoreModule.html" data-type="entity-link">NgrxStoreModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/NgrxStoreModule.html" data-type="entity-link">NgrxStoreModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' : 'data-target="#xs-components-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' : 'id="xs-components-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' }>
                                        <li class="link">
                                            <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' : 'data-target="#xs-directives-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' : 'id="xs-directives-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' }>
                                        <li class="link">
                                            <a href="directives/FormControlErrorsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormControlErrorsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TextTypingAnimationDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextTypingAnimationDirective</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' : 'data-target="#xs-pipes-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' : 'id="xs-pipes-links-module-SharedModule-289e7bc18e5f632ce8d01e577dea6af7"' }>
                                        <li class="link">
                                            <a href="pipes/CapitalizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CapitalizePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/EnDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EnDatePipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SharedProvidersModule.html" data-type="entity-link">SharedProvidersModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/BaseApolloGraphQLService.html" data-type="entity-link">BaseApolloGraphQLService</a>
                    </li>
                    <li class="link">
                        <a href="classes/BaseAuthService.html" data-type="entity-link">BaseAuthService</a>
                    </li>
                    <li class="link">
                        <a href="classes/ClearCurrentUser.html" data-type="entity-link">ClearCurrentUser</a>
                    </li>
                    <li class="link">
                        <a href="classes/ClearTodos.html" data-type="entity-link">ClearTodos</a>
                    </li>
                    <li class="link">
                        <a href="classes/CreateTodo.html" data-type="entity-link">CreateTodo</a>
                    </li>
                    <li class="link">
                        <a href="classes/DeleteTodo.html" data-type="entity-link">DeleteTodo</a>
                    </li>
                    <li class="link">
                        <a href="classes/PasswordValidator.html" data-type="entity-link">PasswordValidator</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetCurrentUser.html" data-type="entity-link">SetCurrentUser</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetTodos.html" data-type="entity-link">SetTodos</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateTodo.html" data-type="entity-link">UpdateTodo</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService-1.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/EventService.html" data-type="entity-link">EventService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ModalWindowService.html" data-type="entity-link">ModalWindowService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/OnBeforeUnloadService.html" data-type="entity-link">OnBeforeUnloadService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TodoService.html" data-type="entity-link">TodoService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/ClientGuard.html" data-type="entity-link">ClientGuard</a>
                </li>
                <li class="link">
                    <a href="guards/FormsChangesGuard.html" data-type="entity-link">FormsChangesGuard</a>
                </li>
                <li class="link">
                    <a href="guards/FormsChangesGuard-1.html" data-type="entity-link">FormsChangesGuard</a>
                </li>
                <li class="link">
                    <a href="guards/PublicGuard.html" data-type="entity-link">PublicGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/AppState.html" data-type="entity-link">AppState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ModalWindowConfirm.html" data-type="entity-link">ModalWindowConfirm</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ModalWindowMessage.html" data-type="entity-link">ModalWindowMessage</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Todo.html" data-type="entity-link">Todo</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/User.html" data-type="entity-link">User</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
