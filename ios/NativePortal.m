//
//  NativePortal.m
//  Genji
//
//  Created by Kyle Fang on 9/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "NativePortal.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <FirebaseAuth/FIRGitHubAuthProvider.h>
#import <FirebaseUI/FirebaseAuthUI.h>

@implementation NativePortal

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loginWithGithub:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback)
{
  
}

@end
