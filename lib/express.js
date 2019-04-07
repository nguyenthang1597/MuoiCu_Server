module.exports = (app, logger, express, cookieParser, passport, cors, bodyParser) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(bodyParser({ limit: '1000mb' }));
    app.use(bodyParser.urlencoded({ limit: '1000mb' }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(cors());
}