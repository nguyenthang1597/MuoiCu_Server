module.exports = (app, logger, express, cookieParser, passport, cors, bodyParser) => {
    app.use(logger('dev'));
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json({ limit: '50mb' }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(cors());
}