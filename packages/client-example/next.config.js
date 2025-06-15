//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    output:'export',
    distDir:'exported',
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    typescript:{
        ignoreBuildErrors:true
    },
    webpack:config=>{
        if(!config.resolve){
            config.resolve={}
        }
        if(!config.resolve.fallback){
            config.resolve.fallback={};
        }
        config.resolve.fallback['child_process']=false;
        if(!config.externals){
            config.externals=[];
        }
        config.externals.push('sharp');
        return config;
    }
};

module.exports = withNx(nextConfig);
