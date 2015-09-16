var ItemViewController = UIViewController.extend({
    viewDidLoad() {
        UIViewController.prototype.viewDidLoad.apply(this, arguments);

        var imageUrl = NSURL.URLWithString(`http://i.imgur.com/${this.fileName}.jpg`);
        var imageData = NSData.dataWithContentsOfURL(imageUrl);
        var image = UIImage.imageWithData(imageData);

        var imageView = UIImageView.alloc().initWithImage(image);
        imageView.frame = this.view.frame;
        imageView.contentMode = UIViewContentModeScaleAspectFill;

        this.view.addSubview(imageView);
    }
});

var PageViewController = UIPageViewController.extend({
    viewDidLoad() {
        UIPageViewController.prototype.viewDidLoad.apply(this, arguments);

        this.dataSource = this;

        this._fileNames = ['4zSb0qS', 'jCUvdej', 'bq7JddZ', 'K815GK5', 'GTeMJud', 'SEUNWpX'];
        this._itemViewControllerCache = new NSCache();

        var initialViewController = this._itemViewControllerForIndex(0);
        this.setViewControllersDirectionAnimatedCompletion([initialViewController], UIPageViewControllerNavigationDirectionForward, false, null);
    },

    pageViewControllerViewControllerBeforeViewController(pageViewController, viewController) {
        var index = this._indexOfItemForViewController(viewController);
        if (index <= 0) {
            return null;
        }

        return this._itemViewControllerForIndex(index - 1);
    },

    pageViewControllerViewControllerAfterViewController(pageViewController, viewController) {
        var index = this._indexOfItemForViewController(viewController)
        if (index >= this._fileNames.length - 1) {
            return null;
        }

        return this._itemViewControllerForIndex(index + 1)
    },

    presentationCountForPageViewController(pageViewController) {
        return this._fileNames.length;
    },

    presentationIndexForPageViewController(pageViewController) {
        var currentViewController = pageViewController.viewControllers[0];
        return this._indexOfItemForViewController(currentViewController);
    },

    _indexOfItemForViewController(viewController) {
        var viewControllerIndex = this._fileNames.indexOf(viewController.fileName);
        return viewControllerIndex;
    },

    _itemViewControllerForIndex(index) {
        var fileName = this._fileNames[index];

        var controller = this._itemViewControllerCache.objectForKey(fileName)
        if (controller) {
            return controller;
        }

        controller = new ItemViewController();
        controller.fileName = fileName;

        this._itemViewControllerCache.setObjectForKey(controller, fileName);
        return controller;
    }
}, {
    protocols: [UIPageViewControllerDataSource]
});

var AppDelegate = UIResponder.extend({
    applicationDidFinishLaunchingWithOptions(application, launchOptions) {
        this._window = new UIWindow(UIScreen.mainScreen().bounds);
        this._window.rootViewController = PageViewController.alloc().initWithTransitionStyleNavigationOrientationOptions(
            UIPageViewControllerTransitionStyleScroll, UIPageViewControllerNavigationOrientationHorizontal, null);
        this._window.makeKeyAndVisible();
        return true;
    }
}, {
    protocols: [UIApplicationDelegate]
});

UIApplicationMain(0, null, null, NSStringFromClass(AppDelegate.class()));
