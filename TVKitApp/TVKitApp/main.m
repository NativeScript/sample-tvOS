//
//  main.m
//  TVKitApp
//
//  Created by Jason Zhekov on 9/16/15.
//  Copyright © 2015 Telerik. All rights reserved.
//

#import "NativeScript.h"

extern char metadataPtr __asm("section$start$__DATA$__TNSMetadata");

int main(int argc, char *argv[]) {
    @autoreleasepool {
        NSString *applicationPath = [NSBundle mainBundle].bundlePath;

        [TNSRuntime initializeMetadata:&metadataPtr];
        TNSRuntime *runtime = [[TNSRuntime alloc] initWithApplicationPath:applicationPath];

#ifndef NDEBUG
        TNSRuntimeInspector.logsToSystemConsole = YES;
#endif

        [runtime executeModule:@"./"];

        return 0;
    }
}
