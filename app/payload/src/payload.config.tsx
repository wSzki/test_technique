
// =============================================================================
// ---------------------------------- IMPORTS ----------------------------------
// =============================================================================

// ---------------------------------------------------------
// ------------------------- Core --------------------------
// ---------------------------------------------------------
import path  from 'path'
import React from 'react'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler  } from '@payloadcms/bundler-webpack'
import { slateEditor     } from '@payloadcms/richtext-slate'
import { buildConfig     } from 'payload/config'

// ---------------------------------------------------------
// ---------------------- Collections ----------------------
// ---------------------------------------------------------
import Users from './collections/Users'

// ---------------------------------------------------------
// ------------------------ Globals ------------------------
// ---------------------------------------------------------

// ---------------------------------------------------------
// ------------------------ Plugins ------------------------
// ---------------------------------------------------------
import { payloadCloud } from '@payloadcms/plugin-cloud'
import generateBase64   from 'payload-blurhash-plugin';
import computeBlurhash  from 'payload-blurhash-plugin';
import webp             from "payload-webp";

// =============================================================================
// --------------------------------- VARIABLES ---------------------------------
// =============================================================================

// ---------------------------------------------------------
// ---------------------- Collections ----------------------
// ---------------------------------------------------------
const collections = [
	Users
]
// ---------------------------------------------------------
// ------------------------ Globals ------------------------
// ---------------------------------------------------------
const globals = [

]
// ---------------------------------------------------------
// ------------------------ Plugins ------------------------
// ---------------------------------------------------------
const plugins = [
	payloadCloud(),
	webp(),
	computeBlurhash(),
	generateBase64(),
]

// ---------------------------------------------------------
// ------------------------- Core --------------------------
// ---------------------------------------------------------
const mongo         = mongooseAdapter({url: process.env.DATABASE_URI,})
const graphQL       = {schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),}
const typescript    = {outputFile: path.resolve(__dirname, 'payload-types.ts'),}
const webpackConfig = ((config:any) => {
	//const createHookPath = path.resolve(__dirname, 'uploads/hooks/pdfHook.tsx');
	//const mockModulePath = path.resolve(__dirname, '.mocks/emptyObject.js');
	return {
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				// [createHookPath]: mockModulePath,
			}
		}
	};
})
// =============================================================================
// ---------------------------------- CONFIG -----------------------------------
// =============================================================================

export default buildConfig({

	db          : mongo,
	editor      : slateEditor({}),
	graphQL     : graphQL,
	typescript  : typescript,
	collections : collections,
	plugins     : plugins,
	globals     : globals,

	admin: {
		webpack    : webpackConfig,
		user       : Users.slug,
		bundler    : webpackBundler(),
		components : {
			afterNavLinks  : [ LinkToAnalytics   ],
			afterDashboard : [ ButtonToAnalytics ],
			graphics : {
				//Icon : Logo,
				//Logo : BigLogo,
			},
		},
	},
})

// =============================================================================
// -------------------------------- COMPONENTS ---------------------------------
// =============================================================================

function LinkToAnalytics ({}:any) {
	return (
		<>
			<div className="nav-group__label" style={{color:"#9a9a9a"}}>External Links</div>
			<a href={process.env.PAYLOAD_PUBLIC_ANALYTICS} target="_blank">Analytics</a>
		</>
	)
}

function ButtonToAnalytics ({}:any) {
	return (
		<>
			<h2 className="dashboard__label" >External Links</h2>
			<ul className="dashboard__card-list">
				<li>
					<a href={process.env.PAYLOAD_PUBLIC_ANALYTICS} target="_blank">
						<div className="card card-Home " id="card-Home">
							<h3 className="card__title" style={{textDecoration:"none"}}>Analytics</h3><button type="button" className="btn card__click btn--style-none btn--icon-style-without-border btn--size-medium btn--icon-position-right" aria-label="Edit Home">
								<span className="btn__content">
								</span>
							</button>
						</div>
					</a>
				</li>
			</ul>
		</>
	)
}



