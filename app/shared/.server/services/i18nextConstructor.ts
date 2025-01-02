import {
  createInstance,
  type BackendModule,
  type DefaultNamespace,
  type FlatNamespace,
  type InitOptions,
  type KeyPrefix,
  type Module,
  type Namespace,
  type NewableModule,
  type TFunction,
} from "i18next";
import type { EntryContext, SessionStorage } from "react-router";

export interface LanguageDetectorOptions {
  supportedLanguages: string[];
  fallbackLanguage: string;
  sessionStorage: SessionStorage;
  sessionKey: string;
}

export interface MyRemixI18NextOptions {
  i18next?: Omit<InitOptions, "react" | "detection"> | null;
  backend?: NewableModule<BackendModule<unknown>> | BackendModule<unknown>;
  plugins?: NewableModule<Module>[] | Module[];
  detection: LanguageDetectorOptions;
}

type FallbackNs<Ns> = Ns extends undefined
  ? DefaultNamespace
  : Ns extends Namespace
  ? Ns
  : DefaultNamespace;

export class LanguageDetector {
  constructor(private options: LanguageDetectorOptions) {
    this.isSessionOnly(options);
  }

  private isSessionOnly(options: LanguageDetectorOptions) {
    if (!options.sessionStorage) {
      throw new Error(
        "You need a sessionStorage if you want to only get the locale from the session"
      );
    }
  }

  private async fromSessionStorage(request: Request): Promise<string | null> {
    if (!this.options.sessionStorage) return null;

    let session = await this.options.sessionStorage.getSession(
      request.headers.get("Cookie")
    );

    let lng = session.get(this.options.sessionKey ?? "lng");

    if (!lng) return null;

    return lng;
  }

  public async detect(request: Request): Promise<string> {
    let locale: string | null = null;

    locale = await this.fromSessionStorage(request);

    if (!locale) {
      return this.options.fallbackLanguage;
    }

    return locale;
  }
}

export class MyRemixI18Next {
  private detector: LanguageDetector;

  constructor(private options: MyRemixI18NextOptions) {
    this.detector = new LanguageDetector(this.options.detection);
  }

  public async getLocale(request: Request): Promise<string> {
    return this.detector.detect(request);
  }

  public getRouteNamespaces(context: EntryContext): string[] {
    let namespaces = Object.values(context.routeModules).flatMap((route) => {
      if (typeof route?.handle !== "object") return [];
      if (!route.handle) return [];
      if (!("i18n" in route.handle)) return [];
      if (typeof route.handle.i18n === "string") return [route.handle.i18n];
      if (
        Array.isArray(route.handle.i18n) &&
        route.handle.i18n.every((value) => typeof value === "string")
      ) {
        return route.handle.i18n as string[];
      }
      return [];
    });

    return [...new Set(namespaces)];
  }

  async getFixedT<
    N extends
      | FlatNamespace
      | readonly [FlatNamespace, ...FlatNamespace[]] = DefaultNamespace,
    KPrefix extends KeyPrefix<FallbackNs<N>> = undefined
  >(
    requestOrLocale: Request | string,
    namespaces?: N,
    options: Omit<InitOptions, "react"> & { keyPrefix?: KPrefix } = {}
  ): Promise<TFunction<FallbackNs<N>, KPrefix>> {
    let [instance, locale] = await Promise.all([
      this.createInstance({ ...this.options.i18next, ...options }),
      typeof requestOrLocale === "string"
        ? requestOrLocale
        : this.getLocale(requestOrLocale),
    ]);

    await instance.changeLanguage(locale);

    if (namespaces) await instance.loadNamespaces(namespaces);
    else if (instance.options.defaultNS) {
      await instance.loadNamespaces(instance.options.defaultNS);
    } else await instance.loadNamespaces("translation" as DefaultNamespace);

    return instance.getFixedT<N, KPrefix, N>(
      locale,
      namespaces,
      options?.keyPrefix
    );
  }

  private async createInstance(options: Omit<InitOptions, "react"> = {}) {
    let instance = createInstance();
    let plugins = [
      ...(this.options.backend ? [this.options.backend] : []),
      ...(this.options.plugins || []),
    ];
    for (const plugin of plugins) instance.use(plugin);
    await instance.init(options);
    return instance;
  }
}
