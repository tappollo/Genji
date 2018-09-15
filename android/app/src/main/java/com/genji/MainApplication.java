package com.genji;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.RNSharePackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNVersionNumberPackage(),
            new VectorIconsPackage(),
            new RNSharePackage(),
            new RNShakeEventPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new RNFirebasePackage(),
            new FastImageViewPackage(),
            new BlurViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
